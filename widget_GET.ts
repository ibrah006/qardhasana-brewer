import { schema } from "./widget_GET.schema";
import superjson from "superjson";
import { db } from "../helpers/db";
import { sql } from "kysely";
import { generateWidgetScript } from "../helpers/widgetScript";

export async function handle(request: Request) {
  try {
    const url = new URL(request.url);
    const validatedInput = schema.parse({
      hostIdentifier: url.searchParams.get("hostIdentifier"),
      assetId: url.searchParams.get("assetId"),
    });

    // Fetch asset data from database
    const assetResult = await db
      .selectFrom("assets")
      .select([
        "assets.id",
        "assets.title",
        "assets.fundGoal",
        "assets.repaymentCapableAmount",
      ])
      .select((eb) => [
        sql<number>`(
          COALESCE((SELECT SUM(amount) FROM donations WHERE donations.asset_id = assets.id), 0) +
          COALESCE((SELECT SUM(principal_amount) FROM loans WHERE loans.asset_id = assets.id AND loans.status != 'requested'), 0)
        )`.as("currentAmountRaised"),
      ])
      .where("assets.id", "=", validatedInput.assetId)
      .executeTakeFirst();

    if (!assetResult) {
      return new Response(superjson.stringify({ error: "Asset not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const widgetData = {
      title: assetResult.title,
      goalAmount: Number(assetResult.fundGoal),
      repaymentCapableAmount: Number(assetResult.repaymentCapableAmount),
      currentAmount: Number(assetResult.currentAmountRaised),
    };

    const scriptContent = generateWidgetScript(
      validatedInput.hostIdentifier,
      widgetData,
    );

    return new Response(scriptContent, {
      headers: {
        "Content-Type": "application/javascript; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Failed to generate widget script:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(superjson.stringify({ error: errorMessage }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
