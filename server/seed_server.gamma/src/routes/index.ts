import * as express from "express";


const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("shop/index", { title: "Express" });

});

/* GET home page. */
router.get("/user", (req, res, next) => {
  // res.render("shop/index", { title: "Express" });
  res.json({
    message: "Hello World",
    name: "Alvin",
  });
});
export const indexRouter: express.Router = router;
