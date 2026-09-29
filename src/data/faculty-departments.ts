/**
 * Faculty-Department hierarchy data with "self department" support.
 *
 * A faculty can have multiple departments. A department can be a "self department"
 * that also contains sub-departments (e.g., GEE department contains AMS, GIC, GTR).
 */

export interface NamespacedText {
    kh: string;
    en: string;
}

export type UnitKind = "faculty" | "department" | "sub-department";

export interface Unit {
    id: string;
    name: NamespacedText;
    kind: UnitKind;
    parentId?: string;
    subDepartments?: Unit[];
    category: NamespacedText;
    logo?: string;
    requirements: NamespacedText[];
}

export interface Faculty {
    id: string;
    name: NamespacedText;
    kind: "faculty";
    departments: Unit[];
    category: NamespacedText;
    logo?: string;
}

export const facultyDepartments: Faculty[] = [
    {
        id: "gee",
        name: {
            kh: "មហាវិទ្យាល័យវិស្វកម្ម",
            en: "Faculty of Electrical Engineering",
        },
        kind: "faculty",
        category: {
            kh: "វិស្វកម្ម",
            en: "Engineering",
        },
        logo: "/images/FOE-logo.png",
        departments: [
            {
                id: "gee",
                name: {
                    kh: "ដេប៉ាតឺម៉ង់វិស្វកម្មអគ្គិសនី (GEE)",
                    en: "Department of Electrical Power Engineering (GEE)",
                },
                kind: "department",
                parentId: "foe",
                category: {
                    kh: "វិស្វកម្មអគ្គិសនី",
                    en: "Electrical Power Engineering",
                },
                logo: "/images/GEE-logo.png",
                requirements: [
                    { kh: "មានចំណេះដឹងល្អពីគ្រប់គ្រងអគ្គិសនី", en: "Strong knowledge in electrical power systems" },
                    { kh: "យល់ដឹងពីការរចនាក្រដាសអគ្គិសនី", en: "Understanding of electrical power distribution" },
                ],
                subDepartments: [
                    {
                        id: "ams",
                        name: {
                            kh: "ដេប៉ាតឺម៉ង់បច្ចេកវិទ្យាការិយាល័យ (AMS)",
                            en: "Department of Automation and Mechatronics Systems (AMS)",
                        },
                        kind: "sub-department",
                        parentId: "gee",
                        category: {
                            kh: "បច្ចេកវិទ្យាការិយាល័យ",
                            en: "Automation and Mechatronics",
                        },
                        logo: "/images/AMS-logo.png",
                        requirements: [
                            { kh: "ចេះដឹងពី PLC និង SCADA", en: "Proficient in PLC and SCADA" },
                            { kh: "មានជំនាញក្នុងការរចនាស្ថាបត្យកម្ម", en: "Software engineering skills" },
                        ],
                    },
                    {
                        id: "gic",
                        name: {
                            kh: "ដេប៉ាតឺម៉ង់វិស្វកម្មព័ត៌មាន និងទំនាក់ទំនង (GIC)",
                            en: "Department of Information and Communication Engineering (GIC)",
                        },
                        kind: "sub-department",
                        parentId: "gee",
                        category: {
                            kh: "វិស្វកម្មព័ត៌មាន",
                            en: "Information and Communication Engineering",
                        },
                        logo: "/images/GIC-logo.png",
                        requirements: [
                            { kh: "ស្គាល់ពីវិស�យ IT", en: "Familiarity with the IT industry" },
                            {
                                kh: "ចេះដឹងបច្ចេកវិទ្យា API, Database, Web Frontend",
                                en: "Mastery of API, Database, Web frontend technologies",
                            },
                        ],
                    },
                    {
                        id: "gtr",
                        name: {
                            kh: "ដេប៉ាតឺម៉ង់វិស្វកម្មទូរគមនាគមន៍ និងបណ្តាញ (GTR)",
                            en: "Department of Telecommunication and Network Engineering (GTR)",
                        },
                        kind: "sub-department",
                        parentId: "gee",
                        category: {
                            kh: "វិស្វកម្មទូរគមនាគមន៍",
                            en: "Telecommunication and Network Engineering",
                        },
                        logo: "/images/GTR-logo.png",
                        requirements: [
                            { kh: "យល់ដឹងពីបណ្តាញកុំព្យូទ័រ", en: "Understanding of computer networks" },
                            { kh: "មានជំនាញក្នុងវិស្វកម្មទូរគមនាគមន៍", en: "Skills in telecommunication engineering" },
                        ],
                    },
                ],
            },
            {
                id: "gar",
                name: {
                    kh: "ដេប៉ាតឺម៉ង់ស្វ័យប្រវត្តិកម្ម និងមនុស្សយន្ត (GAR)",
                    en: "Department of Automation and Robotics Engineering (GAR)",
                },
                kind: "department",
                parentId: "foe",
                category: {
                    kh: "ស្វ័យប្រវត្តិកម្ម",
                    en: "Automation and Robotics",
                },
                logo: "/images/GAR-logo.png",
                requirements: [],
            },
            {
                id: "gmc",
                name: {
                    kh: "ដេប៉ាតឺម៉ង់វិស្វកម្មមេកានិកខ្មែរ (GMC)",
                    en: "Department of Mechanical Engineering (GMC)",
                },
                kind: "department",
                parentId: "foe",
                category: {
                    kh: "វិស្វកម្មមេកានិក",
                    en: "Mechanical Engineering",
                },
                logo: "/images/GMC-logo.png",
                requirements: [],
            },
            {
                id: "gce",
                name: {
                    kh: "ដេប៉ាតឺម៉ង់វិស្វកម្មស្ថាបត្យកម្ម (GCE)",
                    en: "Department of Civil Engineering (GCE)",
                },
                kind: "department",
                parentId: "foe",
                category: {
                    kh: "វិស្វកម្មស្ថាបត្យកម្ម",
                    en: "Civil Engineering",
                },
                logo: "/images/GCE-logo.png",
                requirements: [],
            },
        ],
    },
];

/**
 * Helper functions for navigating the hierarchy
 */

/** Get all departments directly under a faculty */
export function getDepartmentsByFaculty(facultyId: string): Unit[] {
    const faculty = facultyDepartments.find(f => f.id === facultyId);
    return faculty?.departments ?? [];
}

/** Get a department by ID (including nested sub-departments) */
export function getDepartmentById(facultyId: string, departmentId: string): Unit | undefined {
    const faculty = facultyDepartments.find(f => f.id === facultyId);
    if (!faculty) return undefined;

    function findInUnits(units: Unit[]): Unit | undefined {
        for (const unit of units) {
            if (unit.id === departmentId) return unit;
            if (unit.subDepartments) {
                const found = findInUnits(unit.subDepartments);
                if (found) return found;
            }
        }
        return undefined;
    }

    return findInUnits(faculty.departments);
}

/** Get sub-departments of a department (for self-departments) */
export function getSubDepartments(facultyId: string, departmentId: string): Unit[] {
    const department = getDepartmentById(facultyId, departmentId);
    return department?.subDepartments ?? [];
}

/** Get all units (departments + sub-departments) flat for a faculty */
export function getAllUnitsFlat(facultyId: string): Unit[] {
    const faculty = facultyDepartments.find(f => f.id === facultyId);
    if (!faculty) return [];

    const result: Unit[] = [];

    function flatten(units: Unit[]) {
        for (const unit of units) {
            result.push(unit);
            if (unit.subDepartments) {
                flatten(unit.subDepartments);
            }
        }
    }

    flatten(faculty.departments);
    return result;
}

/** Check if a department is a "self department" (has sub-departments) */
export function isSelfDepartment(facultyId: string, departmentId: string): boolean {
    const department = getDepartmentById(facultyId, departmentId);
    return !!(department?.subDepartments && department.subDepartments.length > 0);
}
