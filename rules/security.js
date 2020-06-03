/* eslint-disable no-inline-comments */

module.exports = {
    rules: {
        'security/detect-buffer-noassert': 'error', // Detects calls to buffer with noAssert flag set https://github.com/nodesecurity/eslint-plugin-security
        'security/detect-child-process': 'error', // Detects instances of child_process & non-literal exec() https://github.com/nodesecurity/eslint-plugin-security/blob/master/docs/avoid-command-injection-node.md
        'security/detect-disable-mustache-escape': 'error', // Detects object.escapeMarkup = false, which can be used with some template engines to disable escaping of HTML entities. This can lead to Cross-Site Scripting (XSS) vulnerabilities. https://github.com/nodesecurity/eslint-plugin-security
        'security/detect-eval-with-expression': 'error', // Detects eval(variable) which can allow an attacker to run arbitary code inside your process. https://github.com/nodesecurity/eslint-plugin-security
        'security/detect-new-buffer': 'error', // Detects buffer instantiation https://github.com/nodesecurity/eslint-plugin-security
        'security/detect-no-csrf-before-method-override': 'error', // Detects Express csrf middleware setup before method-override middleware. This can allow GET requests (which are not checked by csrf) to turn into POST requests later. https://github.com/nodesecurity/eslint-plugin-security
        'security/detect-non-literal-fs-filename': 'warn', // Detects variable in filename argument of fs calls, which might allow an attacker to access anything on your system. https://github.com/nodesecurity/eslint-plugin-security
        'security/detect-non-literal-regexp': 'warn', // Detects RegExp(variable), which might allow an attacker to DOS your server with a long-running regular expression. https://github.com/nodesecurity/eslint-plugin-security
        'security/detect-non-literal-require': 'warn', // Detects require(variable), which might allow an attacker to load and run arbitrary code, or access arbitrary files on disk. https://github.com/nodesecurity/eslint-plugin-security
        'security/detect-object-injection': 'warn', // Detects variable[key] as a left- or right-hand assignment operand. https://github.com/nodesecurity/eslint-plugin-security
        'security/detect-possible-timing-attacks': 'warn', // Detects insecure comparisons (==, !=, !== and ===), which check input sequentially. https://github.com/nodesecurity/eslint-plugin-security
        'security/detect-pseudoRandomBytes': 'warn', // Detects if pseudoRandomBytes() is in use, which might not give you the randomness you need and expect. https://github.com/nodesecurity/eslint-plugin-security
        'security/detect-unsafe-regex': 'error' // Locates potentially unsafe regular expressions, which may take a very long time to run, blocking the event loop. https://github.com/nodesecurity/eslint-plugin-security
    }
};