import Link from "next/link";
import styles from "../styles/Legal.module.css";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className={styles.legalContainer}>
      <div className={styles.legal}>
        <h1>Privacy Policy</h1>
        <p>Last updated: January 03, 2023</p>
        <div>
          This privacy notice for __________ (&quot;Company&quot;,
          &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), describes how and
          why we might collect, store, use, and/or share (process) your
          information when you use our services (&quot;Services&quot;), such as
          when you visit our website at http://www.CAMBIARDOMINIO.io, or any
          website of ours that links to this privacy notice or Engage with us in
          other related ways, including any sales, marketing, or events.
        </div>

        <h2>1. WHAT INFORMATION DO WE COLLECT?</h2>
        <div>
          We collect personal information that you voluntarily provide to us
          when you register on the Services, express an interest in obtaining
          information about us or our products and Services, when you
          participate in activities on the Services, or otherwise when you
          contact us.
          <div>
            <strong>Personal Information Provided by You.</strong> The personal
            information that we collect depends on the context of your
            interactions with us and the Services, the choices you make, and the
            products and features you use. The personal information we collect
            may include the following:
            <ul>
              <li>email addresses</li>
              <li>usernames</li>
            </ul>
          </div>
          <strong>Payment Data. </strong>We may collect data necessary to
          process your payment if you make purchases, such as your payment
          instrument number, and the security code associated with your payment
          instrument. All payment data is stored by PayPal. You may find their
          privacy notice link{" "}
          <Link
            className={styles.info}
            href="https://www.paypal.com/us/webapps/mpp/ua/privacy-full#personalData"
          >
            here.
          </Link>
          <div>
            <strong>Social Media Login Data.</strong> We may provide you with
            the option to login with us using your existing social media account
            details, like your Facebook, Google, Github, or other social media
            account. If you choose to register in this way, we will collect the
            information described in the section called &quot;HOW DO WE HANDLE
            YOUR SOCIAL LOGINS?&quot;, below.
          </div>
        </div>
        <h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
        <div>
          We process your personal information for a variety of reasons,
          depending on how you interact with our Services, We may process your
          information so you can log in to your account, as well as keep your
          account in working order.
        </div>
        <h2>3. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
        <div>
          Our Services offer you the ability to register and log in using your
          third-party social media account details (like your Facebook or Google
          logins). Where you choose to do this, we will receive certain profile
          information about you from your social media provider. The profile
          information we receive may vary depending on the social media provider
          concerned, but will often include your name and email address, as well
          as other information you choose to make public on such a social media
          platform.
          <div>
            We will use the information we receive only for the purposes that
            are described in this privacy notice or that are otherwise made
            clear to you on the relevant Services. Please note that we do not
            control, and are not responsible for, other uses of your personal
            information by your third-party social media provider. We recommend
            that you review their privacy notice to understand how they collect,
            use, and share your personal information, and how you can set your
            privacy preferences on their sites and apps.
          </div>
        </div>

        <h2>6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
        <div>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements).
        </div>
        <h2>7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
        <div>
          We have implemented appropriate and reasonable technical and
          organizational security measures designed to protect the security of
          any personal information we process. However, despite our safeguards
          and efforts to secure your information, no electronic transmission
          over the Internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information. Although we will do our best to protect your
          personal information, transmission of personal information to and from
          our Services is at your own risk. You should only access the Services
          within a secure environment.
        </div>
        <h2>8. DO WE COLLECT INFORMATION FROM MINORS?</h2>
        <div>
          We do not knowingly solicit data from or market to children under 18
          years of age. By using the Services, you represent that you are at
          least 18 or that you are the parent or guardian of such a minor and
          consent to such minor dependent’s use of the Services. If we learn
          that personal information from users less than 18 years of age has
          been collected, we will deactivate the account and take reasonable
          measures to promptly delete such data from our records.
        </div>
        <h2>9. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
        <div>
          We may update this privacy notice from time to time. The updated
          version will be indicated by an updated &quot;Revised&quot; date and
          the updated version will be effective as soon as it is accessible. If
          we make material changes to this privacy notice, we may notify you
          either by prominently posting a notice of such changes or by directly
          sending you a notification. We encourage you to review this privacy
          notice frequently to be informed of how we are protecting your
          information.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
