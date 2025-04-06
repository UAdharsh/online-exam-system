const tabSwitchMiddleware = (req, res, next) => {
    if (!req.session.tabSwitchCount) {
        req.session.tabSwitchCount = 0;
    }

    const maxTabSwitches = 2;

    if (req.session.tabSwitchCount >= maxTabSwitches) {
        // Automatically submit the exam if tab switch limit is exceeded
        return res.status(403).json({ message: "Exam submitted due to excessive tab switching." });
    }

    // Increment tab switch count
    req.session.tabSwitchCount++;

    next();
};

module.exports = tabSwitchMiddleware;