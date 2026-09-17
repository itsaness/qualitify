import { getMigrations } from "better-auth/db/migration";
import { auth } from "./auth.js";
import fs from "fs";

const { toBeCreated } = await getMigrations(auth.options);

const typeMap = {
    string: "TEXT",
    boolean: "BOOLEAN",
    date: "TIMESTAMP",
    number: "INTEGER",
};

const seen = new Set();
let sql = "";

for (const table of toBeCreated) {
    if (seen.has(table.table)) continue;
    seen.add(table.table);

    const columns = [];
    const foreignKeys = [];

    columns.push(`  "id" TEXT PRIMARY KEY`);

    for (const [fieldName, field] of Object.entries(table.fields)) {
        const sqlType = typeMap[field.type] || "TEXT";
        const nullable = field.required ? "NOT NULL" : "";
        const unique = field.unique ? "UNIQUE" : "";
        columns.push(`  "${fieldName}" ${sqlType} ${unique} ${nullable}`.trimEnd());

        if (field.references) {
            foreignKeys.push(`  FOREIGN KEY ("${fieldName}") REFERENCES "${field.references.model}"("${field.references.field}") ON DELETE ${field.references.onDelete.toUpperCase()}`);
        }
    }

    const allLines = [...columns, ...foreignKeys];
    sql += `CREATE TABLE IF NOT EXISTS "${table.table}" (\n`;
    sql += allLines.join(",\n");
    sql += `\n);\n\n`;
}

fs.writeFileSync("schema.sql", sql);
console.log("✅ schema.sql generated!");