const router = require('express').Router()
const xlsxFile = require('read-excel-file/node');
const XLSX = require('xlsx');
   

router.get('/getQuiz', (req, res) => {
    if(!req.query.difficulty){
        return res.status(200).json({ success: false, message: 'No difficulty provided' })
    }
    let difficulty = req.query.difficulty;
    difficulty = difficulty.toLowerCase();
    if(difficulty !== 'easy' && difficulty !== 'medium' && difficulty !== 'hard') {
        return res.status(200).json({ success: false, message: 'Wrong difficulty' });        
    }
    const workbook = XLSX.readFile('./Quizes.xlsx');
    const sheet_name_list = workbook.SheetNames;
    const allQuestions = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
    let filteredQuestions = allQuestions.filter((row) => {
        return row.difficulty.toLowerCase() === difficulty;
    })
    // randomize the questions  
    for (let i = filteredQuestions.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [filteredQuestions[i], filteredQuestions[j]] = [filteredQuestions[j], filteredQuestions[i]];
        
        // randomize the options
        for (let k = 4; k>1; k--){
            let l = Math.floor(Math.random()*(3) + 1)
            if( k == filteredQuestions[i].answer) {
                filteredQuestions[i].answer = l;
            }
            else if( l == filteredQuestions[i].answer) {
                filteredQuestions[i].answer = k;
            }
            
            [filteredQuestions[i]['option'+k], filteredQuestions[i]['option'+l]] = [filteredQuestions[i]['option'+l], filteredQuestions[i]['option'+k]];
        }
    }   
    return res.status(200).json({ success: true, quizes: filteredQuestions.slice(0, filteredQuestions.length> 10 ? 10 : undefined)})
})

module.exports = router