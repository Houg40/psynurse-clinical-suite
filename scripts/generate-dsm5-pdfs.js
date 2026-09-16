import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../src/modules/cds/data/dsm5Criteria.json');
const outDir = path.join(__dirname, '../public/dsm5-checklists');
const htmlDir = path.join(outDir, 'html');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(htmlDir)) fs.mkdirSync(htmlDir, { recursive: true });

const disorders = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Find Edge or Chrome executable
const candidateBrowsers = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
];

let browserPath = candidateBrowsers.find(p => fs.existsSync(p));
if (!browserPath) {
  console.error('Error: No supported Chromium browser (Edge/Chrome) found for headless PDF generation.');
  process.exit(1);
}
console.log(`Using browser for PDF compilation: ${browserPath}`);

const pdfFilenameMap = {
  adhd: 'ADHD_Diagnostic_Checklist.pdf',
  mdd: 'Major_Depressive_Disorder_Checklist.pdf',
  gad: 'Generalized_Anxiety_Disorder_Checklist.pdf',
  bipolar: 'Bipolar_I_Disorder_Checklist.pdf',
  ptsd: 'PTSD_Diagnostic_Checklist.pdf',
  panic: 'Panic_Disorder_Checklist.pdf',
  agoraphobia: 'Agoraphobia_Checklist.pdf',
  social_anxiety: 'Social_Anxiety_Disorder_Checklist.pdf',
  ocd: 'OCD_Diagnostic_Checklist.pdf',
  schizophrenia: 'Schizophrenia_Diagnostic_Checklist.pdf',
  schizoaffective: 'Schizoaffective_Disorder_Checklist.pdf',
  delusional: 'Delusional_Disorder_Checklist.pdf',
  asd: 'Autism_Spectrum_Disorder_Checklist.pdf',
  dmdd: 'Disruptive_Mood_Dysregulation_Disorder_Checklist.pdf',
  ied: 'Intermittent_Explosive_Disorder_Checklist.pdf',
  did: 'Dissociative_Identity_Disorder_Checklist.pdf',
  cluster_a: 'Cluster_A_Personality_Disorders_Checklist.pdf',
  cluster_b: 'Cluster_B_Personality_Disorders_Checklist.pdf',
  cluster_c: 'Cluster_C_Personality_Disorders_Checklist.pdf',
  adjustment: 'Adjustment_Disorder_Checklist.pdf',
  aud: 'Alcohol_Use_Disorder_Checklist.pdf',
  cud: 'Cannabis_Use_Disorder_Checklist.pdf',
  oud: 'Opioid_Use_Disorder_Checklist.pdf',
  stimulant: 'Stimulant_Use_Disorder_Checklist.pdf',
  sedative: 'Sedative_Anxiolytic_Use_Disorder_Checklist.pdf',
  tobacco: 'Tobacco_Use_Disorder_Checklist.pdf'
};

function generateDisorderHtml(d) {
  const dateFormatted = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${d.name} — DSM-5-TR Evaluation Checklist</title>
  <style>
    @page {
      size: letter;
      margin: 14mm 14mm 14mm 14mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 10.5pt;
      line-height: 1.35;
      color: #0f172a;
      margin: 0;
      padding: 0;
      background: #ffffff;
    }
    .header {
      border-bottom: 2.5px solid #0f766e;
      padding-bottom: 8px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .clinic-title {
      font-size: 12.5pt;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.2px;
      margin: 0 0 2px 0;
    }
    .clinician-sub {
      font-size: 9.5pt;
      font-weight: 700;
      color: #0f766e;
      margin: 0 0 2px 0;
    }
    .clinic-meta {
      font-size: 8pt;
      color: #64748b;
      margin: 0;
    }
    .header-right {
      text-align: right;
      font-size: 8.5pt;
      color: #475569;
    }
    .header-right strong {
      display: block;
      color: #0f172a;
      font-size: 9pt;
    }
    .patient-box {
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 12px;
      display: grid;
      grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr;
      gap: 8px;
      font-size: 8.5pt;
    }
    .field-label {
      font-weight: bold;
      color: #334155;
      margin-bottom: 2px;
    }
    .field-line {
      border-bottom: 1px dotted #94a3b8;
      min-height: 15px;
    }
    .disorder-banner {
      background: #f0fdfa;
      border: 1.5px solid #99f6e4;
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 14px;
    }
    .disorder-title {
      font-size: 12pt;
      font-weight: 900;
      color: #134e4a;
      margin: 0 0 3px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .icd-pill {
      font-size: 8.5pt;
      background: #0f766e;
      color: #ffffff;
      padding: 2px 7px;
      border-radius: 4px;
      font-family: ui-monospace, monospace;
      font-weight: bold;
    }
    .disorder-overview {
      font-size: 8.5pt;
      color: #334155;
      margin: 0;
    }
    .section-block {
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    .section-header {
      background: #f1f5f9;
      border-left: 3.5px solid #0f766e;
      padding: 4px 8px;
      font-size: 9pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
    }
    .item-row {
      display: flex;
      align-items: flex-start;
      margin-bottom: 5px;
      font-size: 8.5pt;
      page-break-inside: avoid;
    }
    .box {
      width: 13px;
      height: 13px;
      border: 1.5px solid #475569;
      border-radius: 2px;
      margin-right: 8px;
      margin-top: 2px;
      flex-shrink: 0;
    }
    .item-code {
      font-weight: bold;
      color: #0f172a;
      margin-right: 4px;
      min-width: 26px;
      flex-shrink: 0;
    }
    .core-badge {
      background: #ffe4e6;
      color: #9f1239;
      border: 1px solid #fecdd3;
      font-size: 7pt;
      font-weight: 800;
      padding: 1px 4px;
      border-radius: 3px;
      margin-left: 4px;
      text-transform: uppercase;
    }
    .specifier-box {
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      border-radius: 6px;
      padding: 8px 10px;
      margin-top: 10px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    .specifier-title {
      font-size: 8.5pt;
      font-weight: 800;
      color: #0f766e;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .specifier-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      font-size: 8pt;
    }
    .mdm-box {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 8px 10px;
      margin-top: 10px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    .mdm-title {
      font-size: 8.5pt;
      font-weight: bold;
      color: #1e293b;
      margin-bottom: 4px;
    }
    .mdm-lines {
      height: 38px;
      border-bottom: 1px dotted #94a3b8;
    }
    .signature-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 24px;
      margin-top: 16px;
      padding-top: 8px;
      border-top: 1px solid #cbd5e1;
      font-size: 8pt;
      page-break-inside: avoid;
    }
    .sig-line {
      border-bottom: 1px solid #475569;
      height: 22px;
      margin-bottom: 4px;
    }
  </style>
</head>
<body>

  <div class="header">
    <div>
      <div class="clinic-title">PSYCHIATRIC NURSE PRACTITIONER SERVICES</div>
      <div class="clinician-sub">Monica Preder, MSN, APRN, PMHNP-BC • Board Certified Psychiatric Nurse Practitioner</div>
      <div class="clinic-meta">Practice: Therapeutic Health Services (THS) • Washington State Telehealth</div>
    </div>
    <div class="header-right">
      <strong>DSM-5-TR Evaluation Checklist</strong>
      <span>Date: ${dateFormatted}</span>
    </div>
  </div>

  <div class="patient-box">
    <div>
      <div class="field-label">Patient Name:</div>
      <div class="field-line"></div>
    </div>
    <div>
      <div class="field-label">DOB:</div>
      <div class="field-line"></div>
    </div>
    <div>
      <div class="field-label">Evaluation Date:</div>
      <div class="field-line">${dateFormatted}</div>
    </div>
    <div>
      <div class="field-label">MRN / Chart #:</div>
      <div class="field-line"></div>
    </div>
  </div>

  <div class="disorder-banner">
    <div class="disorder-title">
      <span>${d.name}</span>
      <span class="icd-pill">${d.icd10}</span>
    </div>
    <p class="disorder-overview">${d.overview}</p>
  </div>

  ${d.sections.map(s => `
    <div class="section-block">
      <div class="section-header">
        <span>${s.title}</span>
        <span>${s.subtitle || ''}</span>
      </div>
      ${s.items.map(item => `
        <div class="item-row">
          <div class="box"></div>
          <span class="item-code">${item.code}:</span>
          <span>
            ${item.text}
            ${item.isCore ? '<span class="core-badge">Core Criterion</span>' : ''}
          </span>
        </div>
      `).join('')}
    </div>
  `).join('')}

  ${d.specifiers && d.specifiers.length > 0 ? `
    <div class="specifier-box">
      <div class="specifier-title">Clinical Specifiers &amp; Subtypes</div>
      <div class="specifier-grid">
        ${d.specifiers.map(spec => `
          <div>
            <strong>${spec.label}:</strong>
            <ul style="margin: 3px 0 0 16px; padding: 0;">
              ${spec.options.map(opt => `<li>☐ ${opt}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  ` : ''}

  <div class="mdm-box">
    <div class="mdm-title">Diagnostic Conclusion &amp; Medical Decision Making (MDM):</div>
    <div style="font-size: 8pt; color: #475569; margin-bottom: 4px;">
      ☐ Full Diagnostic Criteria Met &nbsp;&nbsp;&nbsp;&nbsp; ☐ Sub-threshold Symptoms &nbsp;&nbsp;&nbsp;&nbsp; ☐ Ruled Out (Alternative Differential Documented Below)
    </div>
    <div class="mdm-lines"></div>
  </div>

  <div class="signature-grid">
    <div>
      <div class="field-label">Clinician Signature:</div>
      <div class="sig-line"></div>
      <div style="font-weight: bold; color: #0f766e;">Monica Preder, MSN, APRN, PMHNP-BC</div>
      <div style="color: #64748b;">Board Certified Psychiatric Nurse Practitioner • DEA / WA State APRN on file</div>
    </div>
    <div>
      <div class="field-label">Date &amp; Clinical Time:</div>
      <div class="sig-line"></div>
      <div style="color: #64748b;">Time Spent in Diagnostic Assessment &amp; Counseling: ______ min</div>
    </div>
  </div>

</body>
</html>`;
}

console.log(`Generating standalone HTML and compiling to PDF for ${disorders.length} DSM-5 disorders...`);

let successCount = 0;

for (const disorder of disorders) {
  const htmlContent = generateDisorderHtml(disorder);
  const htmlFilename = `${disorder.id}.html`;
  const htmlPath = path.join(htmlDir, htmlFilename);
  fs.writeFileSync(htmlPath, htmlContent, 'utf-8');

  const pdfFilename = pdfFilenameMap[disorder.id] || `${disorder.id}_Checklist.pdf`;
  const pdfPath = path.join(outDir, pdfFilename);

  try {
    execFileSync(browserPath, [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--run-all-compositor-stages-before-draw',
      `--print-to-pdf=${pdfPath}`,
      htmlPath
    ]);
    console.log(`✓ Generated: ${pdfFilename}`);
    successCount++;
  } catch (err) {
    console.error(`✗ Error compiling PDF for ${disorder.id}:`, err.message);
  }
}

console.log(`\nBatch PDF Generation Complete: ${successCount} / ${disorders.length} PDFs compiled successfully in ${outDir}`);
