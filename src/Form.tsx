import React, {useEffect, useState} from 'react';

import {gradient} from './Gradient'
import {MuiColorInput} from 'mui-color-input'
import {CopyField} from '@eisberg-labs/mui-copy-field';
import {Card, CardContent, Container, Grid, TextField, Typography} from '@mui/material';


export default function Form() {
    const [textInput, setText] = useState(localStorage.getItem("text") || "请输入你的文本")
    const [colorStart, setColorS] = useState(localStorage.getItem("color_s") || "rgb(255, 0, 0)");
    const [colorEnd, setColorE] = useState(localStorage.getItem("color_e") || "rgb(0, 0, 255)");

    const [result, updateResult] = useState(gradient(textInput, colorStart, colorEnd));

    useEffect(() => {
        localStorage.setItem('text', textInput);
        localStorage.setItem('color_s', colorStart);
        localStorage.setItem('color_e', colorEnd);
        updateResult(gradient(textInput, colorStart, colorEnd));
    }, [textInput, colorStart, colorEnd])

    return (
        <Container fixed>
            <Card sx={{borderRadius: 2}}>
                <Grid container spacing={2} sx={{padding: "20px"}}>
                    <Grid item xs={12}>
                        <TextField fullWidth value={textInput}
                                   id="outlined-multiline-flexible"
                                   multiline
                                   maxRows={5}
                                   onChange={e => {
                                       setText(e.target.value)
                                   }} label="Text"></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <MuiColorInput value={colorStart} onChange={setColorS} label="Start color" fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <MuiColorInput value={colorEnd} onChange={setColorE} label="End color" fullWidth/>
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Preview
                                    </Typography>
                                    {result.html.length !== 0 ?
                                        <Typography>{result.html}</Typography> :
                                        <Typography color="text.disabled">Type text to view the preview</Typography>}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <CopyField
                                label="点击按钮复制"
                                value={result.text} fullWidth
                                onCopySuccess={console.log}
                                onCopyError={console.log}
                                copyTooltip={"复制带颜色的文本"}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
}
