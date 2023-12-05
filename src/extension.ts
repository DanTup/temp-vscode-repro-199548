import * as vscode from 'vscode';
import * as path from 'path';

export async function activate(context: vscode.ExtensionContext) {
	const filePath = path.join(vscode.workspace.workspaceFolders![0].uri.fsPath, "foo.txt");
	context.subscriptions.push(vscode.languages.registerCodeActionsProvider(
		{ scheme: 'file' },
		{
			provideCodeActions(document, range, context, token) {
				const results = [
					new vscode.CodeAction("Foo", vscode.CodeActionKind.QuickFix),
				];

				console.log(`Returning ${results.length} CodeActions`);
				return results;
			},
		}
	));
	await null;
	const doc = await vscode.workspace.openTextDocument(filePath);
	const editor = await vscode.window.showTextDocument(doc);
	const codeActions = await vscode.commands.executeCommand("vscode.executeCodeActionProvider", editor.document.uri, new vscode.Range(doc.positionAt(0), doc.positionAt(0)));
	console.log(`Got ${(codeActions as any).length} CodeActions`);

}

// This method is called when your extension is deactivated
export function deactivate() { }
