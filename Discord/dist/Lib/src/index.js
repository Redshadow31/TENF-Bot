"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const fs = require("fs");
const path = require("path");
const node_fs_1 = require("node:fs");
const folderPath = `${__dirname}/../../../../Lib/src`;
const corePath = `${__dirname}/../../../../Core/src`;
const discordPath = `${__dirname}/../../../../Discord/src/packetHandlers/handlers`;
const parentTypes = new Map();
const typeHasDecorator = new Map();
const backToFrontPackets = new Array();
const frontToBackPackets = new Array();
const nonePackets = new Array();
const coreImplementedPackets = new Array();
const discordImplementedPackets = new Array();
function checkForDecorators(filePath) {
    const sourceCode = fs.readFileSync(filePath, "utf8");
    const sourceFile = ts.createSourceFile(filePath, sourceCode, ts.ScriptTarget.ESNext, true);
    function visit(node) {
        var _a, _b;
        if (ts.isClassDeclaration(node) && node.heritageClauses) {
            parentTypes.set(node.name.escapedText.toString(), node.heritageClauses[0].types[0].expression.escapedText);
            if (node.modifiers && node.modifiers.length > 0 && node.modifiers.some(modifier => { var _a, _b; return ((_b = (_a = modifier === null || modifier === void 0 ? void 0 : modifier.expression) === null || _a === void 0 ? void 0 : _a.expression) === null || _b === void 0 ? void 0 : _b.escapedText) === "sendablePacket"; })) {
                typeHasDecorator.set(node.name.escapedText.toString(), true);
                const modifier = node.modifiers[0];
                const directionName = (_b = (_a = modifier === null || modifier === void 0 ? void 0 : modifier.expression) === null || _a === void 0 ? void 0 : _a.arguments[0].name.escapedText) !== null && _b !== void 0 ? _b : "";
                if (directionName === "BACK_TO_FRONT") {
                    backToFrontPackets.push(node.name.escapedText.toString());
                }
                else if (directionName === "FRONT_TO_BACK") {
                    frontToBackPackets.push(node.name.escapedText.toString());
                }
                else {
                    nonePackets.push(node.name.escapedText.toString());
                }
            }
            else {
                typeHasDecorator.set(node.name.escapedText.toString(), false);
            }
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
}
function checkForPacketHandlers(filePath, array) {
    const sourceCode = fs.readFileSync(filePath, "utf8");
    const sourceFile = ts.createSourceFile(filePath, sourceCode, ts.ScriptTarget.ESNext, true);
    function visit(node) {
        if (ts.isCallExpression(node) && [
            "packetHandler",
            "commandRequires",
            "adminCommand"
        ].some(v => v === node.expression.getText())) {
            const packetType = node.arguments[0].escapedText;
            array.push(packetType);
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
}
function walkDirectory(dir, callback) {
    fs.readdirSync(dir)
        .forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDirectory(fullPath, callback);
        }
        else if (fullPath.endsWith(".ts")) {
            callback(fullPath);
        }
    });
}
function isDraftBotPacket(packetName) {
    if (parentTypes.has(packetName)) {
        return isDraftBotPacket(parentTypes.get(packetName));
    }
    return packetName === "DraftBotPacket";
}
if ((0, node_fs_1.existsSync)(folderPath)) {
    walkDirectory(folderPath, checkForDecorators);
    let error = false;
    console.log("Verifying packets decorators...");
    for (const packet of parentTypes.keys()) {
        if (isDraftBotPacket(packet) && !typeHasDecorator.get(packet)) {
            console.error(`Packet decorator missing on packet: ${packet}`);
            error = true;
        }
    }
    if (error) {
        process.exit(1);
    }
    console.log("All packets decorators OK");
}
if ((0, node_fs_1.existsSync)(corePath)) {
    walkDirectory(corePath, fullPath => checkForPacketHandlers(fullPath, coreImplementedPackets));
    let error = false;
    console.log("Verifying core packets handlers...");
    for (const packet of frontToBackPackets) {
        if (!coreImplementedPackets.includes(packet)) {
            console.error(`No handler found for packet: ${packet}`);
            error = true;
        }
    }
    for (const packet of coreImplementedPackets) {
        if (!frontToBackPackets.includes(packet)) {
            console.error(`Handler found for a packet not FRONT_TO_BACK: ${packet}`);
            error = true;
        }
    }
    if (error) {
        process.exit(1);
    }
    console.log("All core packets handlers OK");
}
if ((0, node_fs_1.existsSync)(discordPath)) {
    walkDirectory(discordPath, fullPath => checkForPacketHandlers(fullPath, discordImplementedPackets));
    let error = false;
    console.log("Verifying discord packets handlers...");
    for (const packet of backToFrontPackets) {
        if (!discordImplementedPackets.includes(packet)) {
            console.error(`No handler found for packet: ${packet}`);
            error = true;
        }
    }
    for (const packet of discordImplementedPackets) {
        if (!backToFrontPackets.includes(packet)) {
            console.error(`Handler found for a packet not BACK_TO_FRONT: ${packet}`);
            error = true;
        }
    }
    if (error) {
        process.exit(1);
    }
    console.log("All discord packets handlers OK");
}
//# sourceMappingURL=index.js.map