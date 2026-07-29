import DrilchemProductPage from "./DrilchemProductPage";

export default function DrilEzyPage() {
  return (
    <DrilchemProductPage
      productName="DRIL-EZY®"
      productIndex="02"
      productLogo="/herophotos/DRILEZY.png"
      accent="#2869a1"
      valueAccent="#173f67"
      presentationVideo={{
        src: "/herophotos/fracseal-stoploss.mp4",
        poster: "/herophotos/fracseal-stoploss-poster.png",
        label: "VIDEO PRESENTATION",
        caption: "DRIL-EZY® Product Presentation",
      }}
      introduction="DRIL-EZY® is used to safely drill across high differentially pressured zones of up to 4,000 psi."
      descriptionParagraphs={[
        "DRIL-EZY® is an acid-soluble drilling fluid additive designed to protect producing formations, or reservoirs, during drilling operations.",
        "It contains specially graded and sized organic and inorganic materials designed to temporarily seal producing formations, reduce fluid invasion and help prevent formation damage.",
      ]}
      packaging={{
        amount: "40",
        unit: "lb",
        metric: "18.14 kg",
        copy: "DRIL-EZY® is packaged in paper bags.",
      }}
      treatment={[
        "A concentration of 10–12 ppb of DRIL-EZY® is described as providing sufficient wellbore protection.",
        "The supplied product information states that it can trap or block fine clay and drilled-solid particles from entering pores and minimise fluid invasion.",
      ]}
      properties={[
        { label: "Appearance", value: "Yellowish powder" },
        { label: "Density", value: "Max. 1.04 g/cc" },
        { label: "Bulk density", value: "Max. 0.6 g/cc" },
        { label: "pH", value: "Slightly > 7" },
        { label: "Solubility", value: "Minimum 70% in 7.5% HCl (acid soluble)" },
      ]}
      safety={[
        "Normal precautions should be used for employee protection when handling chemical products.",
        "The use of an appropriate respirator, gloves and goggles is recommended for employee comfort and protection.",
        "The supplied product information states that DRIL-EZY® does not have a restricted classification for transportation by international or domestic regulatory agencies.",
      ]}
    />
  );
}
