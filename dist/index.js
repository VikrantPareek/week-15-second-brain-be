import express from "express";
const app = express();
app.get("/", function (req, res) {
    res.json({
        message: "Done!"
    });
});
app.listen(3000);
//# sourceMappingURL=index.js.map