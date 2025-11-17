import { Attachment } from "./types";

export const attachments: Attachment[] = [
  // Test 1 attachments
  {
    id: "att-1",
    type: "link",
    label: "Experiment doc – Notion",
    url: "https://notion.so/test-1-hero-messaging",
    variantId: null
  },
  {
    id: "att-2",
    type: "link",
    label: "Design mockup – Figma",
    url: "https://figma.com/hero-variants",
    variantId: null
  },
  {
    id: "att-3",
    type: "screenshot",
    label: "Variant B screenshot",
    url: "/screenshots/test-1-variant-b.png",
    variantId: "var-1-b"
  },
  
  // Test 2 attachments
  {
    id: "att-4",
    type: "link",
    label: "PRD – Confluence",
    url: "https://confluence.com/onboarding-redesign",
    variantId: null
  },
  {
    id: "att-5",
    type: "link",
    label: "Results dashboard – Mixpanel",
    url: "https://mixpanel.com/test-2-results",
    variantId: null
  },
  
  // Test 3 attachments
  {
    id: "att-6",
    type: "link",
    label: "Design spec – Figma",
    url: "https://figma.com/payment-redesign",
    variantId: null
  },
  {
    id: "att-7",
    type: "link",
    label: "Experiment brief – Notion",
    url: "https://notion.so/test-3-payment-redesign",
    variantId: null
  }
];
