
const analyzeCode = (code) => {
    let feedback = [];
    
    // Check 1: Documentation Check (Comments)
    if (!code.includes("//") && !code.includes("/*")) {
        feedback.push("📝 Tip: Add comments to explain your logic for better readability.");
    }

    // Check 2: Complexity Check (Line Count)
    const lines = code.split('\n').length;
    if (lines > 20) {
        feedback.push(" Warning: Your code is quite long. Consider refactoring it into smaller functions.");
    }

    // Check 3: Modern JavaScript Practices (ES6+)
    if (code.includes("var ")) {
        feedback.push(" Best Practice: Use 'let' or 'const' instead of 'var' for block-scoping.");
    }

    // Fallback: If code is clean
    if (feedback.length === 0) {
        feedback.push(" Great job! Your code follows basic best practices.");
    }

    return feedback;
};

module.exports = analyzeCode;