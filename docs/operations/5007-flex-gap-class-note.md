# Flex gap class note

Avoid runtime-generated Tailwind class names for common layout gap utilities because they can be missed by static extraction.

Verification: confirm expected gap classes appear in the production CSS bundle after build.
