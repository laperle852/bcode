const barcode = require('jsbarcode');
const express = require('express');
const { createCanvas } = require("canvas");

const app = express();
const PORT = 80;

app.get('/', (req, res) => {
    if (!req.query.code)
        return res.status(400).send("Code not present.");

    let options = {
        width: req.query.width,
        height: req.query.height,
        format: req.query.format,
        displayValue: req.query.displayValue,
        fontOptions: req.query.fontOptions,
        font: req.query.font,
        text: req.query.text,
        textAlign: req.query.textAlign,
        textPosition: req.query.textPosition,
        textMargin: req.query.textMargin,
        fontSize: req.query.fontSize,
        background: req.query.background,
        lineColor: req.query.lineColor,
        margin: req.query.margin,
        marginTop: req.query.marginTop,
        marginBottom: req.query.marginBottom,
        marginLeft: req.query.marginLeft,
        marginRight: req.query.marginRight
    }

    for (let key in options) {
        if (options[key] == undefined)
            delete options[key];
    }

    let canvas = createCanvas();

    try {
        barcode(canvas, req.query.code, options);

        let img = canvas.toBuffer('image/png');

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });

        res.end(img);
    } catch (err) {
        res.status(400).send(err);
    }
})

app.listen(PORT, () => console.log("Started"));


