import DrilchemProductPage from "./DrilchemProductPage";

export default function QuicksealPage() {
  return (
    <DrilchemProductPage
      productName="QUICKSEAL®"
      productIndex="05"
      productLogo="/herophotos/QUICKSEAL.png"
      accent="#c8202f"
      valueAccent="#173f67"
      presentationVideo={{
        src: "/herophotos/fracseal-stoploss.mp4",
        poster: "/herophotos/fracseal-stoploss-poster.png",
        label: "VIDEO PRESENTATION",
        caption: "QUICKSEAL® Product Presentation",
      }}
      introduction="QUICKSEAL® is a lost circulation material."
      descriptionParagraphs={[
        "QUICKSEAL® is a lost circulation material comprising a blend of organic cellulose fibres that vary in size and shape. It is designed in three grades: Fine, Medium and Coarse.",
        "Because of its varying particle sizes and shapes, the supplied product information describes QUICKSEAL® as effective in curing lost circulation when fractures, vugs or cavernous zones are encountered.",
      ]}
      productVariants={{
        label: "QUICKSEAL GRADES",
        items: [
          {
            name: "FINE",
            summary: "Seepage → partial losses",
            description: "The fine grade is described for seepage to partial-loss situations.",
          },
          {
            name: "MEDIUM",
            summary: "Medium / fine fractures",
            description: "The medium grade is described for eliminating medium-to-fine fractures and porous zones. The reference states that it can be pumped with most nozzle bits.",
          },
          {
            name: "COARSE",
            summary: "Large fractures / high permeability",
            description: "The coarse grade is presented for curing large fractures and highly permeable formations. It can be spotted through large jets or open pipe.",
          },
        ],
      }}
      packaging={{
        amount: "40",
        unit: "lb",
        metric: "18.14 kg",
        copy: "QUICKSEAL® is packaged in multi-wall bags.",
      }}
      treatment={[
        "The supplied reference states that 30–40 ppb of QUICKSEAL® should be added to a 40–50 bbl pill and spotted opposite the loss zone, preferably through open-ended drill pipe.",
        "For QUICKSEAL® Medium and Coarse, the supplied product information states that a concentration of 30–40 ppb has proven effective in a vugular formation loss zone.",
      ]}
      properties={[
        { label: "Form", value: "Mixed fibrous materials" },
        { label: "Hygroscopic", value: "No" },
        { label: "pH in water", value: "8 ± 0.5" },
        { label: "Solubility", value: "Insoluble" },
        { label: "Specific gravity", value: "0.9 – 1.2" },
        { label: "Flammability", value: "Non-flammable — no fire or explosion" },
        { label: "Toxicity", value: "Non-toxic" },
      ]}
      safety={[
        "Normal precautions should be used for employee protection when handling chemical products.",
        "The use of an appropriate respirator, gloves, goggles and apron is recommended for employee comfort and protection.",
      ]}
    />
  );
}
