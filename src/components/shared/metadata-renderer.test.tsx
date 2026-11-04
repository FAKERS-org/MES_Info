import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { formatMetadataKey, MetadataRenderer } from "./metadata-renderer";

describe("formatMetadataKey", () => {
    it("converts snake_case to Title Case", () => {
        expect(formatMetadataKey("tuition_per_year")).toBe("Tuition Per Year");
        expect(formatMetadataKey("scholarship_details")).toBe("Scholarship Details");
    });

    it("converts kebab-case to Title Case", () => {
        expect(formatMetadataKey("admissions-office")).toBe("Admissions Office");
    });

    it("preserves known acronyms properly", () => {
        expect(formatMetadataKey("moeys_accredited")).toBe("MoEYS Accredited");
        expect(formatMetadataKey("contact_telegram")).toBe("Contact Telegram");
        expect(formatMetadataKey("payment_qr")).toBe("Payment QR");
        expect(formatMetadataKey("tuition_usd")).toBe("Tuition USD");
        expect(formatMetadataKey("tuition_khr")).toBe("Tuition KHR");
        expect(formatMetadataKey("itc_portal_url")).toBe("ITC Portal URL");
        expect(formatMetadataKey("admission_faq")).toBe("Admission FAQ");
        expect(formatMetadataKey("support_qa")).toBe("Support Q&A");
    });
});

describe("MetadataRenderer component", () => {
    it("returns empty string when data is empty or null and no emptyMessage", () => {
        const htmlNull = renderToStaticMarkup(<MetadataRenderer data={null} />);
        expect(htmlNull).toBe("");

        const htmlEmpty = renderToStaticMarkup(<MetadataRenderer data={{}} />);
        expect(htmlEmpty).toBe("");
    });

    it("renders emptyMessage when data is empty and emptyMessage is provided", () => {
        const html = renderToStaticMarkup(
            <MetadataRenderer data={{}} emptyMessage="No metadata available." />,
        );
        expect(html).toContain("No metadata available.");
    });

    it("renders title when provided", () => {
        const html = renderToStaticMarkup(
            <MetadataRenderer
                data={{ academic_advisor: "Dr. Sokha" }}
                title="Advising Information"
            />,
        );
        expect(html).toContain("Advising Information");
        expect(html).toContain("Academic Advisor");
        expect(html).toContain("Dr. Sokha");
    });

    it("renders primitives correctly (strings, numbers, nulls)", () => {
        const html = renderToStaticMarkup(
            <MetadataRenderer
                data={{
                    foundation_year_name: "Pre-Engineering",
                    yearly_credit_count: 30,
                    notes: null,
                    empty_field: "",
                }}
            />,
        );
        expect(html).toContain("Pre-Engineering");
        expect(html).toContain("30");
        expect(html).toContain("—");
    });

    it("renders boolean values with Yes/No badges", () => {
        const html = renderToStaticMarkup(
            <MetadataRenderer
                data={{
                    dormitory_guaranteed: true,
                    entrance_exam_exempt: false,
                }}
            />,
        );
        expect(html).toContain("Yes");
        expect(html).toContain("No");
    });

    it("formats Telegram links correctly", () => {
        const htmlHandle = renderToStaticMarkup(
            <MetadataRenderer
                data={{
                    contact_telegram: "@itc_admissions",
                }}
            />,
        );
        expect(htmlHandle).toContain("https://t.me/itc_admissions");
        expect(htmlHandle).toContain("@itc_admissions");

        const htmlUrl = renderToStaticMarkup(
            <MetadataRenderer
                data={{
                    telegram_channel: "https://t.me/mes_cambodia",
                }}
            />,
        );
        expect(htmlUrl).toContain("https://t.me/mes_cambodia");
        expect(htmlUrl).toContain("@mes_cambodia");
    });

    it("formats web URLs as external links", () => {
        const html = renderToStaticMarkup(
            <MetadataRenderer
                data={{
                    registration_url: "https://admissions.itc.edu.kh/register",
                }}
            />,
        );
        expect(html).toContain('href="https://admissions.itc.edu.kh/register"');
        expect(html).toContain("admissions.itc.edu.kh/register");
    });

    it("formats email addresses as mailto links", () => {
        const html = renderToStaticMarkup(
            <MetadataRenderer
                data={{
                    advisor_email: "advisor@itc.edu.kh",
                }}
            />,
        );
        expect(html).toContain('href="mailto:advisor@itc.edu.kh"');
        expect(html).toContain("advisor@itc.edu.kh");
    });

    it("formats phone numbers with tel: links", () => {
        const html = renderToStaticMarkup(
            <MetadataRenderer
                data={{
                    admissions_phone: "+855 23 880 370",
                }}
            />,
        );
        expect(html).toContain('href="tel:+85523880370"');
        expect(html).toContain("+855 23 880 370");
    });

    it("renders multiline text in whitespace-pre-line paragraph", () => {
        const html = renderToStaticMarkup(
            <MetadataRenderer
                data={{
                    admission_requirements: "1. High school diploma\n2. National exam grade A-C",
                }}
            />,
        );
        expect(html).toContain("whitespace-pre-line");
        expect(html).toContain("1. High school diploma\n2. National exam grade A-C");
    });

    it("renders array of primitives as badges", () => {
        const html = renderToStaticMarkup(
            <MetadataRenderer
                data={{
                    available_shifts: ["Morning", "Afternoon", "Weekend"],
                }}
            />,
        );
        expect(html).toContain("Morning");
        expect(html).toContain("Afternoon");
        expect(html).toContain("Weekend");
    });

    it("renders empty arrays gracefully as None", () => {
        const html = renderToStaticMarkup(
            <MetadataRenderer
                data={{
                    special_discounts: [],
                }}
            />,
        );
        expect(html).toContain("None");
    });

    it("renders nested objects and array of objects recursively", () => {
        const html = renderToStaticMarkup(
            <MetadataRenderer
                data={{
                    contact_person: {
                        name: "Dr. Chan",
                        title: "Dean of Academic Affairs",
                        email: "chan@university.edu.kh",
                    },
                    scholarship_tiers: [
                        { tier: "Full", discount_percent: 100 },
                        { tier: "Partial", discount_percent: 50 },
                    ],
                }}
            />,
        );
        expect(html).toContain("Contact Person");
        expect(html).toContain("Dr. Chan");
        expect(html).toContain("Dean of Academic Affairs");
        expect(html).toContain("chan@university.edu.kh");
        expect(html).toContain("Scholarship Tiers");
        expect(html).toContain("Full");
        expect(html).toContain("100");
        expect(html).toContain("Partial");
        expect(html).toContain("50");
    });
});
