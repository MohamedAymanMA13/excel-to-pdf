import React, { useState ,useEffect } from 'react';
import * as XLSX from 'xlsx';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Table from '../components/TableComponents/Table'
import { InputField, SelectField, CheckboxField } from '../components/Inputs/Inputs'
import { Form, Field } from 'react-final-form'

/*********************************************************************
* @function      : tafqit(Number [,{options}])
* @purpose       : Converts Numbers to Arabic Words with Grammar Rules
* @version       : 1.60
* @author        : Mohsen Alyafei
* @date          : 04 August 2020
* @Licence       : MIT
* @param         : {Number} [Integer in Numeric or String form]
*                  Number may be in Arabic-Indic format (as a string)
* @param         : [{options}] 9 Options passed as object {name:value} as follows:
*
* {Feminine}     : "on": Generate string for a Feminine subject (أرقام بصيغة المؤنث).
*                        The default is the Masculine form.
* {Miah}         : "on": Use Mi'ah for Hundreds (مئة بدل مائة). Default is Ma'ah "مائة".
* {Comma}        : "on": Insert comma between triplet words.
* {SplitHund}    : "on": Split number from hundred words (فصل الرقم عن المئة).
                   i.e. ثلاث مائة. Default "No Split" i.e. (ثلاثمائة).
* {Billions}     : "on": Use Billions (بليون) instead of Miliard (مليار).
* {TextToFollow} : "on": Indicates that there will be text to follow the resulting text.
*                  This permits proper subject name to be added after the resulting text.
* {AG}           : "on": Text is produced in Accusative/Genitive (جر/نصب) case.
*                  The default is the Nominative cse (رفع).
*
* {Subjec}       : An optional array holding the Subject Name to be counted in 4 forms as follows:
*                  [0] = Deafult Name Singular      (e.g. "كتاب/تفاحة/دينار").
*                  [1] = Name for 2's (double)      (e.g. "كتابان/تفاحتان/ديناران").
*                  [2] = Name for plural            (e.g. "كتب/تفاحات/دنانير").
*                  [3] = Name Singular with Tanween (e.g. "كتابًا/تفاحةً/دينارًا").
*                  The subject name will be added to the resulting string in acordance
*                  with the number grammar rules.
* {Legal}        : "on" Uses the lagal form of output text.
*
* @returns       : {string} The wordified number string in Arabic.
**********************************************************************/
const TableScales =["","ألف","مليون","مليار","ترليون","كوادرليون","كوينتليون","سكستليون"], // Add here only
      TableScalesP=["","آلاف","ملايين","مليارات"], // Do not change this table
      TableMale   =["","واحد","اثنان","ثلاثة","أربعة","خمسة","ستة","سبعة","ثمانية","تسعة","عشرة"],
      TableFemale =["","واحدة","اثنتان","ثلاث","أربع","خمس","ست","سبع","ثمان","تسع","عشر"];

function tafqit(NumIn=0,{Feminine,Comma,SplitHund,Miah,Billions,TextToFollow,AG,Subject,Legal}={}) {
if (NumIn == 0) return "صفر";                          // if 0 or "0" then "zero"
let Triplet, Scale, ScalePos, ScalePlural, TableUnits, Table11_19,NumberInWords= "",IsLastEffTriplet= false,Num_99;
const ON= "on",                         // Flag to test if Option is ON
 IsAG   = (AG===ON),                    // Option Accusative or Genitive case Grammar?
 SpWa   = " و",                         // AND word
 TanweenLetter = "ًا",                   // Tanween Fatih for Scale Names above 10
 Ahad  = "أحد", Ehda= "إحدى",           // Masculine/Feminine 11
 // ---- Setup constants for the AG Option (Accusative/Genitive or Nominative case Grammar)
 Taa   = IsAG ?"تي" :"تا",       Taan   = IsAG ? "تين":"تان",        // Hundred 2's مئتا/مائتا مئتان/مائتان
 Aa    = IsAG ?"ي" :"ا",         Aan    = IsAG ? "ين":"ان",          // Scale 2's الفا/مليونا الفان/مليونان
 Ethna = IsAG ?"اثني":"اثنا",    Ethnata = IsAG ? "اثنتي" : "اثنتا", // Masculine/Feminine 12 starting word
 Ethnan= IsAG ?"اثنين" : "اثنان",Ethnatan= IsAG ? "اثنتين" :"اثنتان",// Masculine/Feminine 2
 Woon  = IsAG ?"ين" :"ون",              // Second part of 20's to 90's
 IsSubject = Array.isArray(Subject) && Subject.length===4;        // Check for Subject Array Names

TextToFollow = TextToFollow === ON;     // TextToFollow Option Flag
if(IsSubject) TextToFollow = true;     // Enable TextToFollow Option if Subject Option is ON
NumIn+="";                              // Make numeric string
NumIn =""+NumIn.replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d)); // Convert Arabic-Indic Numbers to Arabic if any
Miah= (Miah===ON) ? "مئة" : "مائة";     // Select chosen Miah (Hundred) Option

TableUnits   = [...TableMale]; Table11_19= [...TableMale]; // Create copies of Masculine Table for manipulation
Table11_19[0]= TableFemale[10];         // Borrow word "عشرة" from Feminine's Table for use in 11-19
Table11_19[1]= Ahad;                    // Masculine starting words for 11
Table11_19[2]= Ethna;                   // Masculine starting words for 12
TableUnits[2]= Ethnan;                  // Masculine word for 2

NumIn = "0".repeat(NumIn.length * 2 % 3) + NumIn;        // Convert Number to a Triplets String

let NumLen = NumIn.length;
for (let digits= NumLen; digits>0; digits-=3) {          // Loop and convert each Triplet
  Triplet = +NumIn.substr(NumLen-digits,3);              // Get a Triplet Number
  IsLastEffTriplet= !+NumIn.substr(NumLen-digits+3);     // Determine if Last Effective Triplet
  if (Triplet) {                                         // If not Empty: Convert Triplet Number to Words
    ScalePos    = digits/3-1;                            // Position of Scale Name in Scale Table
    Scale       = TableScales[ScalePos];                 // Get Scale Name
    ScalePlural = (ScalePos<4 ? TableScalesP[ScalePos] : TableScales[ScalePos] + "ات"); // Make Scale Plural
    // if (Billions && ScalePos===3) Scale="بليون"; ScalePlural="بلايين";    // If Billions Option
    NumberInWords += oneTripletToWords();                                 // Convert 1 Triplet to Words
    if (!IsLastEffTriplet) NumberInWords+= (Comma===ON ? "،" :"") + SpWa; // Add "و " and Option Comma
  }
} // All done with conversion, Process Subject Name if any
let SubjectName="";
if (IsSubject) {                                          // Process Subject Name
  let space   = !IsLastEffTriplet ? "" : " ";             // Position correct spacing
  Triplet     = +(Triplet+"").slice(-2);                  // Get last 2 digits of last Triplet
  SubjectName = space + Subject[0];                       // Default Subject Name is at Pos 0
  if (Triplet>10)      SubjectName = space + Subject[3];  // Subject name with Tanween for 11-99
  else if (Triplet>2)  SubjectName = space + Subject[2];  // Subject name Plural for 3-10
  else if (Triplet>0)  SubjectName = Subject[Triplet-1]+" "+TableUnits[Num_99];  // Reverse names for 1 or 2
}
 return NumberInWords + SubjectName;                      // All done
//------------------------------------------------------------------
//    Core Function Converts 1 Triplet (1 to 999) to Arabic Words
//------------------------------------------------------------------
function oneTripletToWords() {
    Num_99   = Triplet % 100;               // 00 to 99
let Num_100  = ~~(Triplet/100),             // Hundreds (1 digit)
    Num_Unit = Num_99 % 10,                 // 0 to 9 (1 digit)
    Num_Tens = ~~(Num_99/10),               // Tens   (1 digit)
    Word_100 = "", Word_99= "";             // Holds words for Hundreds & 0-99

if (Feminine === ON && !Scale)  {          // If Feminine, use the Feminine table if no scale
  TableUnits   = [...TableFemale]; Table11_19= [...TableFemale];// Create copies of Feminine Table for manipulation
  Table11_19[0]= TableMale[10];             // Borrow word "عشر" from Masculine's Table for use in 11-19
  Table11_19[1]= Ehda;                      // Feminine starting words for 11
  Table11_19[2]= Ethnata;                   // Feminine starting words for 12
  TableUnits[2]= Ethnatan;                  // Feminine word for 2
  if (Num_99 > 19) TableUnits[1] = Ehda;    // Feminine word for 1 used in 20's to 90's
}

if (Num_100) {                              // ---- Do Hundreds (100 to 900)
 if (Num_100 >2) Word_100 = TableFemale[Num_100] + (SplitHund===ON ?" ":"") + Miah;// 300-900
 else if (Num_100 === 1) Word_100 = Miah;                                          // 100
 else Word_100 = Miah.slice(0,-1) +(Scale && !Num_99 || TextToFollow ?Taa:Taan);   // 200 Use either مئتا or مئتان
}

if (Num_99 >19)  Word_99 = TableUnits[Num_Unit] + (Num_Unit ? SpWa : "") +  // 20-99 Units و and
                 (Num_Tens === 2 ? "عشر" : TableFemale[Num_Tens]) + Woon;   // Add Woon for 20's or 30's to 90's
 else if (Num_99 > 10) Word_99 = Table11_19[Num_99-10] + " " + Table11_19[0]; // 11-19
 else if (Num_99>2 || !Num_99 || !IsSubject) Word_99 = TableUnits[Num_99];  // 0 or 3-10 (else keep void for 1 &2)

let Words999 = Word_100 + (Num_100 && Num_99 ? SpWa:"") + Word_99;          // Join Hund, Tens, and Units

if (Scale) {                                                                // Add Scale Name if applicable
  let legalTxt   = (Legal===ON && Num_99< 3)? " " + Scale : "";             // if Legal Option add Extra Word
  let Word_100Wa = (Num_100 ? Word_100 + legalTxt + SpWa :"") + Scale;      // Default Scale Name
  if (Num_99 > 2) {
    Words999 += " " +                                                       // Scale for for 3 to 99
    (Num_99 >10 ? Scale + (IsLastEffTriplet && TextToFollow ? "":TanweenLetter)// Scale for 11 to 99 (Tanween)
    : ScalePlural);                                                         // Scale for 3 to 10 (Plural)
  } else {
    if (!Num_99)           Words999 += " " +Scale;                          // Scale for 0
    else if (Num_99 === 1) Words999  = Word_100Wa;                          // Scale for 1
    else Words999 = Word_100Wa + (IsLastEffTriplet && TextToFollow ? Aa : Aan);// Scale for 2 ألفا or ألفان
    }
}
return Words999; //Return the Triple in Words
}
}


const InputToPdf = () => {
    const [mergedData, setMergedData] = useState([]); // Ensure it's initialized as an array

    useEffect(() => {
      if (Array.isArray(mergedData) && mergedData.length > 0) {
        console.log("modifyPdf called with data:", mergedData);
        modifyPdf();
      }
    }, [mergedData]);
    const price = mergedData.filter(row => parseFloat(row['المبلغ']) > 0);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const handleCheckboxChange = (e) => {
      setIsCheckboxChecked(e.target.checked);
    };
  
    const tableHeaders = [
      { title: 'إسم الحساب البنكي', width: '', value: 'إسم الحساب البنكي' },
      { title: 'اللجنة', width: '', value: 'اللجنة' },
      { title: 'رقم الحساب', width: '', value: 'رقم الحساب' },
      { title: 'المبلغ', width: '', value: 'المبلغ' },
      { title: 'اسم البنك', width: '', value: 'اسم البنك' },
      { title: 'فرع البنك', width: '', value: 'فرع البنك' },
      { title: 'المحافظة', width: '', value: 'المحافظة' },
      { title: 'وحدة', width: '', value: 'وحدة' },
    ];
  
    const modifyPdf = async () => {
        if (!Array.isArray(mergedData)) {
          console.error('mergedData is not an array:', mergedData);
          return;
        }
    
        const price = mergedData.filter(row => parseFloat(row['المبلغ']) > 0);
        const bankMisrRows = price.filter(row => row['اسم البنك'] === 'بنك مصر');
        const otherBankRows = price.filter(row => row['اسم البنك'] !== 'بنك مصر');
    
        console.log('Filtered data:', price);
        console.log('Bank Misr Rows:', bankMisrRows);
        console.log('Other Bank Rows:', otherBankRows);
    
        const zip = new JSZip();
    
        const processRows = async (rows, pdfTemplate, drawTexts) => {
          for (const row of rows) {
            console.log('Processing row:', row);
    
            let response = await fetch(pdfTemplate);
            let existingPdfBytes = await response.arrayBuffer();
            let pdfDoc = await PDFDocument.load(existingPdfBytes);
            pdfDoc.registerFontkit(fontkit);
            let fontBytes = await fetch('Tajawal-Regular.ttf').then(res => res.arrayBuffer());
            let font = await pdfDoc.embedFont(fontBytes);
    
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];
    
            drawTexts(firstPage, row, font);
    
            const pdfBytes = await pdfDoc.save();
            zip.file(`${row['اللجنة']}-${row['اسم البنك']}.pdf`, pdfBytes);
          }
        };
    
        const drawTextForOtherBanks = (page, row, font) => {
          page.drawText(String(row['المبلغ']), {
            x: 420,
            y: 628,
            font: font,
            size: 11,
          });
          page.drawText(String(row['إسم الحساب البنكي']), {
            x: 185,
            y: 575,
            font: font,
            size: 11,
          });
          page.drawText(`${tafqit(row['المبلغ'])} جنيه مصري فقط لا غير`, {
            x: 190,
            y: 610,
            font: font,
            size: 11,
          });
          page.drawText(String(row['رقم الحساب']), {
            x: 220,
            y: 515,
            font: font,
            size: 11,
          });
          page.drawText(`${String(row['اسم البنك'])} فرع ${String(row['فرع البنك'])}`, {
            x: 220,
            y: 482,
            font: font,
            size: 11,
          });
        };
    
        const drawTextForBankMisr = (page, row, font) => {
          page.drawText(String(row['المبلغ']), {
            x: 400,
            y: 595,
            font: font,
            size: 10,
          });
          page.drawText(`${tafqit(row['المبلغ'])} جنيه مصري فقط لا غير`, {
            x: 200,
            y: 575,
            font: font,
            size: 8,
          });
          page.drawText(String(row['رقم الحساب']), {
            x: 300,
            y: 510,
            font: font,
            size: 10,
          });
          page.drawText(String(row['إسم الحساب البنكي']), {
            x: 250,
            y: 490,
            font: font,
            size: 8,
          });
          page.drawText(`- ${String(row['اللجنة'])}`, {
            x: 200,
            y: 462,
            font: font,
            size: 8,
          });
        };
    
        await processRows(otherBankRows, 'ACH.pdf', drawTextForOtherBanks);
        await processRows(bankMisrRows, 'BANQUEMISR.pdf', drawTextForBankMisr);
    
        zip.generateAsync({ type: 'blob' }).then(content => {
          saveAs(content, 'generated_pdfs.zip');
        });
      }
    
      const onSubmit = (data) => {
        console.log('Form submitted with data:', data);
    
        // Handle checkbox field transformation here
        if (isCheckboxChecked) {
          data['اسم البنك'] = 'بنك مصر';
        }
    
        setMergedData(Array.isArray(data) ? data : [data]); // Ensure data is set as an array
      };
      const divStyle = { backgroundColor: '#21A77A', borderRadius: '10px' };
    return (
      <div>
        <div className="py-2"></div>
        <div className="bg-white main-shadow">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="row m-0 p-2">
                  <div className="col-3 py-2 px-1">
                    <Field label="إسم الحساب البنكي" name="إسم الحساب البنكي" id="إسم الحساب البنكي" type="text" render={InputField} />
                  </div>
                  <div className="col-3 py-2 px-1">
                    <Field label='اللجنة' name="اللجنة" id="اللجنة" type="text" render={InputField} />
                  </div>
                  <div className="col-3 py-2 px-1">
                    <Field label='رقم الحساب' name="رقم الحساب" id="رقم الحساب" type="text" render={InputField} />
                  </div>
                  <div className="col-3 py-2 px-1">
                    <Field label='المبلغ' name="المبلغ" id="المبلغ" type="text" render={InputField} />
                  </div>

                  <div className="col-3  px-1"  style={{paddingTop: '33px'}}>
                  <Field
                    name="اسم البنك"
                    id="اسم البنك"
                    label="حوالة داخليه (بنك مصر)"
                    component={CheckboxField}
                    type="checkbox" // Specify the type as checkbox
                    value='بنك مصر' // Set the custom value for the checkbox
                    onChange={handleCheckboxChange} // Handle the change event
                    />
                  </div>
                  {!isCheckboxChecked && 
                   <div className="col-3 py-2 px-1">
                    <Field label='اسم البنك' name="اسم البنك" id="اسم البنك" type="text" render={InputField} />
                  </div>
                  }
                  
                  <div className="col-3 py-2 px-1">
                    <Field label='فرع البنك' name="فرع البنك" id="فرع البنك" type="text" render={InputField} />
                  </div>
                  <div className="col-3 py-2 px-1">
                    <Field label='المحافظة' name="المحافظة" id="المحافظة" type="text" render={InputField} />
                  </div>
                  <div className="col-3 py-2 px-1">
                    <Field label='وحدة' name="وحدة" id="وحدة" type="text" render={InputField} />
                  </div>
                  <div className="p-2 d-flex justify-content-end align-items-end">
                    <button type="submit" className="btn btn-secondary col-1" style={divStyle}>
                      {('تصدير')}
                    </button>
                  </div>
                </div>
              </form>
            )}
          />
        </div>
        <div className='py-2'>
          <Table tableHeaders={tableHeaders} elements={price} />
        </div>
      </div>
    );
  };
  
  export default InputToPdf;
  
