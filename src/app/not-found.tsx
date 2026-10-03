import { Column, Heading, Text } from "@once-ui-system/core";

export default function NotFound() {
  return (
    <Column
      as="section"
      fillWidth
      horizontal="center"
      vertical="center"
      gap="m"
      style={{ minHeight: "60vh" }}
    >
      <Text variant="display-strong-xl" onBackground="neutral-strong">
        404
      </Text>
      <Heading variant="display-default-xs" onBackground="neutral-strong">
        Page Not Found
      </Heading>
      <Text onBackground="neutral-weak">
        The page you are looking for does not exist.
      </Text>
    </Column>
  );
}
