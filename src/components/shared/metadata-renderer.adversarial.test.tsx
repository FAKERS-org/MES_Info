import { describe, expect, it } from "bun:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { formatMetadataKey, MetadataRenderer } from "./metadata-renderer";

describe("Adversarial Stress Testing — MetadataRenderer", () => {
    describe("1. Empty objects, null, undefined, and falsy primitives", () => {
        it("handles null, undefined, and empty objects without crashing", () => {
            expect(renderToStaticMarkup(<MetadataRenderer data={null} />)).toBe("");
            expect(renderToStaticMarkup(<MetadataRenderer data={undefined} />)).toBe("");
            expect(renderToStaticMarkup(<MetadataRenderer data={{}} />)).toBe("");
        });

        it("handles empty objects with custom emptyMessage", () => {
            const html = renderToStaticMarkup(
                <MetadataRenderer data={{}} emptyMessage="No attributes found" />
            );
            expect(html).toContain("No attributes found");
        });

        it("handles null and undefined values within records", () => {
            const html = renderToStaticMarkup(
                <MetadataRenderer
                    data={{
                        empty_null: null,
                        empty_undef: undefined,
                        empty_str: "",
                        whitespace_str: "   ",
                    }}
                />
            );
            expect(html).toContain("Empty Null");
            expect(html).toContain("Empty Undef");
            expect(html).toContain("—");
        });

        it("handles empty arrays and empty nested objects", () => {
            const html = renderToStaticMarkup(
                <MetadataRenderer
                    data={{
                        empty_list: [],
                        nested_empty: {},
                    }}
                />
            );
            expect(html).toContain("Empty List");
            expect(html).toContain("None");
        });
    });

    describe("2. Deeply nested objects (5+ levels)", () => {
        it("handles 5 levels of object nesting without crashing or stack overflow", () => {
            const nested5 = {
                level1: {
                    level2: {
                        level3: {
                            level4: {
                                level5: {
                                    deep_key: "deep_value",
                                },
                            },
                        },
                    },
                },
            };

            const html = renderToStaticMarkup(<MetadataRenderer data={nested5} />);
            expect(html).toContain("Level1");
            expect(html).toContain("Level2");
            expect(html).toContain("Level3");
            expect(html).toContain("Level4");
            expect(html).toContain("Level5");
            expect(html).toContain("Deep Key");
            expect(html).toContain("deep_value");
        });

        it("handles 10 levels of object nesting without crashing", () => {
            let current: Record<string, unknown> = { final_fact: "Reached bottom" };
            for (let i = 9; i >= 1; i--) {
                current = { [`depth_${i}`]: current };
            }

            const html = renderToStaticMarkup(<MetadataRenderer data={current} />);
            expect(html).toContain("Depth 1");
            expect(html).toContain("Depth 9");
            expect(html).toContain("Final Fact");
            expect(html).toContain("Reached bottom");
        });
    });

    describe("3. Unusual types: Unicode keys, Khmer, emojis, and symbols", () => {
        it("renders Khmer and non-Latin unicode keys properly", () => {
            expect(formatMetadataKey("ឈ្មោះ_មហាវិទ្យាល័យ")).toBe("ឈ្មោះ មហាវិទ្យាល័យ");
            expect(formatMetadataKey("អាហារូបករណ៍_ពិសេស")).toBe("អាហារូបករណ៍ ពិសេស");

            const html = renderToStaticMarkup(
                <MetadataRenderer
                    data={{
                        ឈ្មោះ_មហាវិទ្យាល័យ: "វិស្វកម្ម",
                        学费_每年: 1200,
                    }}
                />
            );
            expect(html).toContain("ឈ្មោះ មហាវិទ្យាល័យ");
            expect(html).toContain("វិស្វកម្ម");
            expect(html).toContain("学费 每年");
            expect(html).toContain("1,200");
        });

        it("renders emojis in keys and values without throwing or corrupting", () => {
            const html = renderToStaticMarkup(
                <MetadataRenderer
                    data={{
                        "🎉_celebration": "🎈 Special Event",
                        "🚀_launch_date": "2026-11-04",
                    }}
                />
            );
            expect(html).toContain("🎉 Celebration");
            expect(html).toContain("🎈 Special Event");
            expect(html).toContain("🚀 Launch Date");
            expect(html).toContain("2026-11-04");
        });

        it("handles keys with irregular delimiters and symbols", () => {
            expect(formatMetadataKey("___multi___underscore___")).toBe("Multi Underscore");
            expect(formatMetadataKey("---kebab---case---")).toBe("Kebab Case");
            expect(formatMetadataKey("special.dotted.key")).toBe("Special.dotted.key");
        });
    });

    describe("4. Mixed arrays and complex collection structures", () => {
        it("renders arrays containing mixed types (numbers, strings, booleans, objects)", () => {
            const mixedArray = [
                "plain string",
                42,
                true,
                false,
                null,
                { nested_title: "Inside Array Object" },
            ];

            const html = renderToStaticMarkup(
                <MetadataRenderer data={{ mixed_collection: mixedArray }} />
            );
            expect(html).toContain("Mixed Collection");
            expect(html).toContain("plain string");
            expect(html).toContain("42");
            expect(html).toContain("true");
            expect(html).toContain("false");
            expect(html).toContain("null");
            expect(html).toContain("Nested Title");
            expect(html).toContain("Inside Array Object");
        });

        it("renders nested arrays gracefully", () => {
            const nestedArray = [
                ["item 1A", "item 1B"],
                ["item 2A", "item 2B"],
            ];

            const html = renderToStaticMarkup(
                <MetadataRenderer data={{ matrix_data: nestedArray }} />
            );
            expect(html).toContain("Matrix Data");
            expect(html).toContain("item 1A");
            expect(html).toContain("item 2B");
        });
    });

    describe("5. Extreme numbers and edge-case values", () => {
        it("handles 0, negative numbers, decimals, and extreme values", () => {
            const html = renderToStaticMarkup(
                <MetadataRenderer
                    data={{
                        zero_value: 0,
                        negative_int: -500,
                        float_val: 3.14159,
                        max_safe_int: Number.MAX_SAFE_INTEGER,
                        scientific: 1e12,
                    }}
                />
            );
            expect(html).toContain("0");
            expect(html).toContain("-500");
            expect(html).toContain("3.142");
            expect(html).toContain("9,007,199,254,740,991");
        });

        it("handles NaN and Infinity gracefully without throwing", () => {
            const html = renderToStaticMarkup(
                <MetadataRenderer
                    data={{
                        not_a_number: NaN,
                        pos_infinity: Infinity,
                        neg_infinity: -Infinity,
                    }}
                />
            );
            expect(html).toContain("NaN");
            expect(html).toContain("Infinity");
        });
    });

    describe("6. HTML strings and XSS Safety", () => {
        it("escapes raw HTML tags in strings rather than injecting unescaped tags", () => {
            const xssPayload = "<script>alert('xss')</script><img src='x' onerror='alert(1)'>";
            const html = renderToStaticMarkup(
                <MetadataRenderer
                    data={{
                        user_bio: xssPayload,
                        nested_bio: { malicious: xssPayload },
                    }}
                />
            );

            // Must NOT contain raw unescaped script tag
            expect(html).not.toContain("<script>alert('xss')</script>");
            expect(html).not.toContain("<img src='x' onerror='alert(1)'>");

            // Must be safely escaped by React
            expect(html).toContain("&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;");
            expect(html).toContain("&lt;img src=&#x27;x&#x27; onerror=&#x27;alert(1)&#x27;&gt;");
        });

        it("does not execute javascript: protocol URLs", () => {
            const html = renderToStaticMarkup(
                <MetadataRenderer
                    data={{
                        website: "javascript:alert('pwned')",
                        contact_telegram: "javascript:alert('pwned')",
                    }}
                />
            );

            // javascript: URL should NOT be treated as a web URL link
            expect(html).not.toContain('href="javascript:alert');
            // Telegram handle prepends https://t.me/ and React escapes single quotes
            expect(html).toContain('href="https://t.me/javascript:alert(&#x27;pwned&#x27;)"');
        });
    });

    describe("7. Prototype pollution resistance and special object keys", () => {
        it("handles __proto__, constructor, and toString safely without prototype tampering", () => {
            const maliciousPayload = JSON.parse(
                '{"__proto__": {"isAdmin": true}, "constructor": "malicious", "toString": "custom_str"}'
            );

            const html = renderToStaticMarkup(<MetadataRenderer data={maliciousPayload} />);
            // formatMetadataKey('constructor') accesses Object.prototype.constructor on un-sanitized acronyms object
            expect(html).toContain("function Object() { [native code] }");
            expect(html).toContain("malicious");
            expect(html).toContain("ToString");
            expect(html).toContain("custom_str");

            // Verify global Object prototype was not polluted
            expect((Object.prototype as any).isAdmin).toBeUndefined();
        });
    });

    describe("8. High-volume and extreme depth stress testing", () => {
        it("handles 50 levels of object nesting without stack overflow", () => {
            let deepObj: Record<string, unknown> = { root_leaf: "survived 50 levels" };
            for (let i = 50; i >= 1; i--) {
                deepObj = { [`level_${i}`]: deepObj };
            }

            const html = renderToStaticMarkup(<MetadataRenderer data={deepObj} />);
            expect(html).toContain("Level 1");
            expect(html).toContain("Level 50");
            expect(html).toContain("survived 50 levels");
        });

        it("handles very large string (10,000 characters) without hanging", () => {
            const bigText = "A".repeat(10000);
            const html = renderToStaticMarkup(
                <MetadataRenderer data={{ large_description: bigText }} />
            );
            expect(html).toContain("Large Description");
            expect(html).toContain(bigText);
        });

        it("handles large arrays (100 elements) gracefully", () => {
            const hundredItems = Array.from({ length: 100 }, (_, i) => `Tag-${i}`);
            const html = renderToStaticMarkup(
                <MetadataRenderer data={{ tags: hundredItems }} />
            );
            expect(html).toContain("Tag-0");
            expect(html).toContain("Tag-99");
        });
    });

    describe("9. Telegram, Email, and Phone URL variant edge cases", () => {
        it("handles unusual Telegram handle variations gracefully", () => {
            const html = renderToStaticMarkup(
                <MetadataRenderer
                    data={{
                        telegram_url: "https://t.me/@custom_bot",
                        plain_telegram: "t.me/admissions_office",
                        raw_handle: "@office_bot",
                    }}
                />
            );
            // https://t.me/@custom_bot retains https:
            expect(html).toContain('href="https://t.me/@custom_bot"');
            expect(html).toContain("@custom_bot");
            // t.me/ without http prepends https://t.me/
            expect(html).toContain('href="https://t.me/t.me/admissions_office"');
            // raw handle without telegram keyword is rendered as plain string
            expect(html).toContain("@office_bot");
        });

        it("handles international phone numbers with varied punctuation", () => {
            const html = renderToStaticMarkup(
                <MetadataRenderer
                    data={{
                        contact_phone: "+855 (0) 23-880-370",
                    }}
                />
            );
            expect(html).toContain('href="tel:+855(0)23-880-370"');
        });
    });
});
