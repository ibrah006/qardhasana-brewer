import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/Tabs";
import { LoanList } from "../components/LoanList";
import { Skeleton } from "../components/Skeleton";
import { StripePaymentWidget } from "../components/StripePaymentWidget";
import { useGetPremiumStatus } from "../helpers/premiumStatusHooks";
import { useGetLoans } from "../helpers/loanHooks";
import { HandHeart, Coins } from "lucide-react";
import styles from "./donate.$hostId.module.css";

const DonatePage = () => {
  const { hostId } = useParams<{ hostId: string }>();

  // Check premium status
  const { data: premiumStatusData, isFetching: isPremiumStatusLoading } =
    useGetPremiumStatus({
      hostIdentifier: hostId || "",
    });

  // Get available loan requests for this host (only if premium)
  const {
    data: loansData,
    isFetching: isLoansLoading,
    error: loansError,
  } = useGetLoans({
    hostIdentifier: hostId || "",
    status: "requested",
  });

  const isPremium = premiumStatusData?.premiumStatus?.isPremium || false;

  const renderDonationForm = () => (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <HandHeart className={styles.headerIcon} />
        <h2>Support {hostId}</h2>
        <p>Your contribution helps cover their monthly overheads.</p>
      </div>
      <StripePaymentWidget hostIdentifier={hostId || ""} />
    </div>
  );

  const renderLendingContent = () => (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Coins className={styles.headerIcon} />
        <h2>Fund {hostId}'s Loan Requests</h2>
        <p>Provide interest-free loans to help with their business needs.</p>
      </div>
      <LoanList
        loans={loansData?.loans}
        isLoading={isLoansLoading}
        error={loansError}
        isHostView={false}
        lenderName="Anonymous Supporter"
      />
    </div>
  );

  // Show loading state while checking premium status
  if (isPremiumStatusLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Skeleton
              style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}
            />
            <Skeleton style={{ width: "200px", height: "2rem" }} />
            <Skeleton style={{ width: "300px", height: "1rem" }} />
          </div>
          <div className={styles.loadingSkeleton}>
            <Skeleton style={{ width: "100%", height: "2.5rem" }} />
            <Skeleton style={{ width: "100%", height: "2.5rem" }} />
            <Skeleton style={{ width: "100%", height: "3rem" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {isPremium ? `Support ${hostId}` : `Donate to ${hostId}`} | QardHasana
        </title>
        <meta
          name="description"
          content={`Support ${hostId} with ${isPremium ? "donations or interest-free loans" : "a sharia-compliant donation"}.`}
        />
      </Helmet>
      <div className={styles.container}>
        {isPremium ? (
          <div className={styles.tabsContainer}>
            <Tabs defaultValue="donate">
              <TabsList className={styles.tabsList}>
                <TabsTrigger value="donate">Donate</TabsTrigger>
                <TabsTrigger value="lend">Lend</TabsTrigger>
              </TabsList>
              <TabsContent value="donate">{renderDonationForm()}</TabsContent>
              <TabsContent value="lend">{renderLendingContent()}</TabsContent>
            </Tabs>
          </div>
        ) : (
          renderDonationForm()
        )}
      </div>
    </>
  );
};

export default DonatePage;
