import { schema, OutputType } from "./widget-intent_POST.schema";
import { stripe } from "../../helpers/stripe";
import { db } from "../../helpers/db";
import superjson from "superjson";
import { Transaction } from "kysely";
import { DB } from "../../helpers/schema";

async function validateAssetAndHost(
  trx: Transaction<DB>,
  assetId: number,
  isLoan: boolean,
) {
  const assetAndHost = await trx
    .selectFrom("assets")
    // .innerJoin("users", "assets.userId", "users.id")
    // .leftJoin(
    //   "hostPremiumStatus",
    //   "users.id",
    //   "hostPremiumStatus.hostIdentifier"
    // )
    .where("assets.id", "=", assetId)
    .select([
      "assets.id as assetId",
      // "users.id as hostId",
      // "hostPremiumStatus.isPremium",
    ])
    .executeTakeFirst();

  if (!assetAndHost) {
    throw new Error("Asset not found.");
  }

  // if (isLoan) {
  //   if (!assetAndHost.isPremium) {
  //     throw new Error("Loans are a premium feature. The host is not subscribed.");
  //   }
  // }

  return assetAndHost;
}

export async function handle(request: Request) {
  // Get the origin from the request to allow dynamic CORS
  const origin = request.headers.get("Origin");

  try {
    const json = JSON.parse(await request.text());
    const validatedInput = schema.parse(json);

    const { assetId, amount, type, donorName, repaymentMonths } =
      validatedInput;

    await db.transaction().execute(async (trx) => {
      await validateAssetAndHost(trx, assetId, type === "loan");
    });

    const amountInCents = Math.round(amount * 100);

    const metadata: {
      assetId: string;
      type: "donation" | "loan";
      donorName: string;
      repaymentMonths?: string;
    } = {
      assetId: String(assetId),
      type,
      donorName: donorName || "Anonymous",
    };

    if (type === "loan" && repaymentMonths) {
      metadata.repaymentMonths = String(repaymentMonths);
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata,
    });

    if (!paymentIntent.client_secret) {
      throw new Error(
        "Failed to create payment intent: client_secret is null.",
      );
    }

    const output: OutputType = {
      clientSecret: paymentIntent.client_secret,
    };

    return new Response(superjson.stringify(output), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST",
      },
    });
  } catch (error) {
    console.error("Failed to create widget payment intent:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(superjson.stringify({ error: errorMessage }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST",
      },
    });
  }
}

// export async function handle(request: Request) {
//   // Handle OPTIONS preflight request
//   if (request.method === "OPTIONS") {
//     return new Response(null, {
//       status: 204,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "POST, OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type",
//       },
//     });
//   }

//   try {
//     const json = JSON.parse(await request.text());
//     const validatedInput = schema.parse(json);

//     const { assetId, amount, type, donorName, repaymentMonths } =
//       validatedInput;

//     await db.transaction().execute(async (trx) => {
//       await validateAssetAndHost(trx, assetId, type === "loan");
//     });

//     // Amount is in dollars, convert to cents for Stripe
//     const amountInCents = Math.round(amount * 100);

//     const metadata: {
//       assetId: string;
//       type: "donation" | "loan";
//       donorName: string;
//       repaymentMonths?: string;
//     } = {
//       assetId: String(assetId),
//       type,
//       donorName: donorName || "Anonymous",
//     };

//     if (type === "loan" && repaymentMonths) {
//       metadata.repaymentMonths = String(repaymentMonths);
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amountInCents,
//       currency: "usd",
//       automatic_payment_methods: {
//         enabled: true,
//       },
//       metadata,
//     });

//     if (!paymentIntent.client_secret) {
//       throw new Error(
//         "Failed to create payment intent: client_secret is null.",
//       );
//     }

//     const output: OutputType = {
//       clientSecret: paymentIntent.client_secret,
//     };

//     return new Response(superjson.stringify(output), {
//       status: 201,
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "POST, OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type",
//       },
//     });
//   } catch (error) {
//     console.error("Failed to create widget payment intent:", error);
//     const errorMessage =
//       error instanceof Error ? error.message : "An unknown error occurred";
//     return new Response(superjson.stringify({ error: errorMessage }), {
//       status: 400,
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "POST, OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type",
//       },
//     });
//   }
// }

// import { schema, OutputType } from "./widget-intent_POST.schema";
// import { stripe } from "../../helpers/stripe";
// import { db } from "../../helpers/db";
// import superjson from "superjson";
// import { Transaction } from "kysely";
// import { DB } from "../../helpers/schema";

// async function validateAssetAndHost(
//   trx: Transaction<DB>,
//   assetId: number,
//   isLoan: boolean,
// ) {
//   const assetAndHost = await trx
//     .selectFrom("assets")
//     // .innerJoin("users", "assets.userId", "users.id")
//     // .leftJoin(
//     //   "hostPremiumStatus",
//     //   "users.id",
//     //   "hostPremiumStatus.hostIdentifier"
//     // )
//     .where("assets.id", "=", assetId)
//     .select([
//       "assets.id as assetId",
//       // "users.id as hostId",
//       // "hostPremiumStatus.isPremium",
//     ])
//     .executeTakeFirst();

//   if (!assetAndHost) {
//     throw new Error("Asset not found.");
//   }

//   // if (isLoan) {
//   //   if (!assetAndHost.isPremium) {
//   //     throw new Error("Loans are a premium feature. The host is not subscribed.");
//   //   }
//   // }

//   return assetAndHost;
// }

// export async function handle(request: Request) {
//   try {
//     const json = JSON.parse(await request.text());
//     const validatedInput = schema.parse(json);

//     const { assetId, amount, type, donorName, repaymentMonths } =
//       validatedInput;

//     await db.transaction().execute(async (trx) => {
//       await validateAssetAndHost(trx, Number(assetId), type === "loan");
//     });

//     // Amount is in dollars, convert to cents for Stripe
//     const amountInCents = Math.round(amount * 100);

//     const metadata: {
//       assetId: string;
//       type: "donation" | "loan";
//       donorName: string;
//       repaymentMonths?: string;
//     } = {
//       assetId: String(assetId),
//       type,
//       donorName: donorName || "Anonymous",
//     };

//     if (type === "loan" && repaymentMonths) {
//       metadata.repaymentMonths = String(repaymentMonths);
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amountInCents,
//       currency: "usd",
//       automatic_payment_methods: {
//         enabled: true,
//       },
//       metadata,
//     });

//     if (!paymentIntent.client_secret) {
//       throw new Error(
//         "Failed to create payment intent: client_secret is null.",
//       );
//     }

//     const output: OutputType = {
//       clientSecret: paymentIntent.client_secret,
//     };

//     return new Response(superjson.stringify(output), {
//       status: 201,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Failed to create widget payment intent:", error);
//     const errorMessage =
//       error instanceof Error ? error.message : "An unknown error occurred";
//     return new Response(superjson.stringify({ error: errorMessage }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
