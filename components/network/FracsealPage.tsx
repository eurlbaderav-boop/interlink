import DrilchemProductPage from "./DrilchemProductPage";

const applications = [
  "Minimising fluid invasion",
  "Stabilising unconsolidated sand formations",
  "Reducing torque and drag in highly deviated wells",
  "Stabilising shale",
  "Stabilising coal beds",
  "Improving return permeability",
] as const;

export default function FracsealPage() {
  return (
    <DrilchemProductPage
      productName="FRACSEAL®"
      productIndex="01"
      productLogo="/herophotos/FRACSEAL.png"
      accent="#91662f"
      valueAccent="#76502b"
      presentationVideo={{
        src: "/herophotos/fracseal-stoploss.mp4",
        poster: "/herophotos/fracseal-stoploss-poster.png",
        label: "VIDEO PRESENTATION",
        caption: "FRACSEAL® Product Presentation",
      }}
      introduction="FRACSEAL® is a finely sized, micronised organic cellulose fibre used to prevent seepage and partial fluid losses."
      descriptionParagraphs={[
        "FRACSEAL® is a finely sized, micronised organic cellulose fibre used for:",
      ]}
      applications={applications}
      packaging={{
        amount: "25",
        unit: "lb",
        metric: "11.34 kg",
        copy: "FRACSEAL® is packaged in multi-wall paper bags.",
      }}
      treatment={[
        "It is recommended to mix 8–10 ppb of FRACSEAL® in the active mud system for borehole stability and the prevention of problems such as sloughing of shale and coal, as well as when drilling through depleted or unconsolidated sand formations.",
        "The concentration can be increased up to 20 ppb in the active mud when drilling through carbonates or highly reactive shale formations.",
      ]}
      properties={[
        { label: "Colour", value: "Light tan / brown" },
        { label: "Form", value: "Fine cellulose fibre" },
        { label: "pH in water — 10 ppb", value: "6.5 – 7.5" },
      ]}
      safety={[
        "Appropriate respirator, gloves, goggles and apron are recommended for employee comfort and protection.",
        "The supplied product information describes FRACSEAL® as non-toxic and considers it harmless in the marine ecosystem.",
        "It also states that FRACSEAL® does not have a restricted classification for transportation by international or domestic regulatory agencies.",
      ]}
      additionalSection={{
        index: "06",
        label: "BOREHOLE PROTECTION",
        title: "Preventing stuck pipe",
        paragraphs: [
          "FRACSEAL® can be added to the active mud system for borehole protection by reinforcing and strengthening the filter cake.",
          "According to the supplied product description, the fibre matrix within the thin wall cake forms an impermeable filter cake that restricts fluid invasion into the formation.",
        ],
        listLabel: "FORMATIONS PRESENTED FOR USE",
        listItems: ["Shale", "Coal", "Unconsolidated sand", "Limestone"],
        closingParagraph:
          "The supplied information states that the product is designed so its fibre structure can be removed when the well is brought into production.",
      }}
    />
  );
}
