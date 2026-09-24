import { Heading, Text, Column, Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";

export async function generateMetadata() {
  const title = "Privacy & Cookie Policy | Jacqueline Mhitaryan";
  return Meta.generate({
    title,
    description: "Privacy and cookie policy for Jacqueline Mhitaryan / Mhitaryan Consulting.",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(title)}`,
    path: "/privacy",
  });
}

export default function PrivacyPage() {
  return (
    <Column
      maxWidth="m"
      gap="xl"
      paddingY="l"
      paddingX="l"
    >
      <Heading variant="display-strong-s">Privacy & Cookie Policy</Heading>

      <Column gap="m">
        <Heading variant="heading-strong-m">1. Who I Am</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          Jacqueline Mhitaryan is based in Sweden and operates within the EU and internationally.
          I respect your privacy and am committed to protecting your personal data in line with the
          General Data Protection Regulation (GDPR).
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">2. What Data I Collect</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          I may collect and process:
        </Text>
        <Column as="ul" gap="s" paddingLeft="l" style={{ listStyleType: 'disc' }}>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">Contact information (name, email, message) when you reach out through email.</Text>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">Technical data such as IP address, browser type, and device, for website performance and security.</Text>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">Cookies for basic analytics and to improve your browsing experience.</Text>
        </Column>
        <Text variant="body-default-m" onBackground="neutral-weak">
          I do not collect sensitive data or sell personal information to third parties.
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">3. How I Use Your Data</Heading>
        <Column as="ul" gap="s" paddingLeft="l" style={{ listStyleType: 'disc' }}>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">To respond to messages and inquiries.</Text>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">To improve site functionality and performance.</Text>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">To understand visitor interactions via anonymized analytics.</Text>
        </Column>
        <Text variant="body-default-m" onBackground="neutral-weak">
          Your data is only stored as long as necessary for these purposes.
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">4. Legal Basis</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          I process data based on:
        </Text>
        <Column as="ul" gap="s" paddingLeft="l" style={{ listStyleType: 'disc' }}>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">Consent (e.g., accepting cookies or submitting a form).</Text>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">Legitimate interest (e.g., maintaining website security and performance).</Text>
        </Column>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">5. Sharing of Data</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          I only share limited data with trusted service providers, such as website hosting and
          analytics tools. All providers comply with EU data protection standards.
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">6. Cookies</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          Cookies are small text files stored on your device. I use:
        </Text>
        <Column as="ul" gap="s" paddingLeft="l" style={{ listStyleType: 'disc' }}>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">
            Essential cookies – required for the site to function.
          </Text>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">
            Analytics cookies – help understand traffic and usage patterns.
          </Text>
        </Column>
        <Text variant="body-default-m" onBackground="neutral-weak">
          You can change or withdraw your cookie consent anytime via your browser settings.
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">7. Your Rights</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          Under GDPR, you have the right to access, correct, or delete your personal data, withdraw
          consent at any time, and complain to the Swedish Authority for Privacy Protection (IMY) if
          you believe your data has been mishandled. Contact me at{" "}
          <a
            href="mailto:contact@mhitaryan.com"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            contact@mhitaryan.com
          </a>{" "}
          for any privacy-related requests.
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">8. Data Security</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          I use secure hosting and encryption (HTTPS) to protect your information and prevent
          unauthorized access.
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">9. Updates</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          This policy may be updated occasionally to reflect legal or technical changes. The latest
          version will always be available on this page.
        </Text>
        <Text variant="body-default-s" onBackground="neutral-weak" style={{ fontStyle: 'italic' }}>
          Last updated: June 2026
        </Text>
      </Column>
    </Column>
  );
}
