import { calculateBac2Tuition, getUniversityKhan, getUniversityShifts, hasQualification } from "../src/lib/bac2";

// Test 1: Explicit metadata waivers
const sampleUni = {
    default_tuition_per_year: 1000,
    has_scholarships: true,
    metadata_json: {
        khan: "Toul Kork",
        shifts: ["Morning", "Evening", "Weekend"],
        bac2_waivers: {
            A: 100,
            B: 50,
            C: 25,
            details: "Grade A gets 100% Year 1 waiver",
        },
    },
};

const resA = calculateBac2Tuition(sampleUni, "A");
console.assert(resA.adjustedAmount === 0, `Expected $0 for Grade A, got ${resA.adjustedAmount}`);
console.assert(resA.discountPercent === 100, `Expected 100% discount, got ${resA.discountPercent}`);
console.assert(resA.hasWaiver === true, "Expected hasWaiver to be true");

const resB = calculateBac2Tuition(sampleUni, "B");
console.assert(resB.adjustedAmount === 500, `Expected $500 for Grade B, got ${resB.adjustedAmount}`);
console.assert(resB.discountPercent === 50, `Expected 50% discount, got ${resB.discountPercent}`);

const resAll = calculateBac2Tuition(sampleUni, "ALL");
console.assert(resAll.adjustedAmount === 1000, `Expected $1000 for ALL, got ${resAll.adjustedAmount}`);
console.assert(resAll.hasWaiver === false, "Expected hasWaiver to be false for ALL");

// Test 2: Standard merit fallback
const fallbackUni = {
    default_tuition_per_year: 800,
    has_scholarships: true,
    metadata_json: {},
};
const resFbA = calculateBac2Tuition(fallbackUni, "A");
console.assert(resFbA.adjustedAmount === 0, `Expected $0 for fallback Grade A, got ${resFbA.adjustedAmount}`);

// Test 3: Khan extraction
console.assert(getUniversityKhan(sampleUni) === "Toul Kork", "Expected Khan Toul Kork");

const addressUni = {
    metadata_json: {},
    address: "St. 271, Sangkat Phsar Doeum Thkov, Khan Chamkar Mon, Phnom Penh",
};
console.assert(getUniversityKhan(addressUni) === "Chamkar Mon", "Expected Khan Chamkar Mon from address");

// Test 4: Shifts
const shifts = getUniversityShifts(sampleUni);
console.assert(shifts.includes("Weekend"), "Expected Weekend in shifts");

// Test 5: Qualification
console.assert(hasQualification({ abbreviation: "ITC", metadata_json: {} }, "ASSOCIATE") === true, "Expected ITC to have associate");
console.assert(hasQualification({ abbreviation: "RUPP", metadata_json: {} }, "BACHELOR") === true, "Expected RUPP to have bachelor");

console.log("All bac2 self-checks passed!");
