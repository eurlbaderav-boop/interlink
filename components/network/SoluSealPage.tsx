import DrilchemProductPage from "./DrilchemProductPage";

export default function SoluSealPage() {
  return (
    <DrilchemProductPage
      productName="SOLU-SEAL®"
      productIndex="04"
      productLogo="/herophotos/SOLU-SEAL.png"
      accent="#167548"
      valueAccent="#173f67"
      presentationVideo={{
        src: "/herophotos/fracseal-stoploss.mp4",
        poster: "/herophotos/fracseal-stoploss-poster.png",
        label: "VIDEO PRESENTATION",
        caption: "SOLU-SEAL® Product Presentation",
      }}
      introduction="SOLU-SEAL® is used as a reactive LCM pill through producing and reservoir formations."
      descriptionParagraphs={[
        "SOLU-SEAL® is a proprietary, single-sack blend of sized and shaped materials designed to be highly effective in curing severe to total loss of circulation in producing formations without the addition of other lost-circulation material.",
        "The supplied product information states that SOLU-SEAL® LCM is 80% acid soluble and can be readily removed from producing reservoirs after stopping whole-mud loss or invasion, thereby minimising formation damage.",
        "It also describes SOLU-SEAL® LCM as 100% biodegradable, non-toxic, non-fermenting, non-corrosive, temperature stable to 450°F and compatible with all types of drilling and drill-in fluids.",
      ]}
      packaging={{
        amount: "40",
        unit: "lb",
        metric: "18.14 kg",
        copy: "SOLU-SEAL® is packaged in multi-wall paper bags.",
      }}
      treatment={[
        "The supplied product information states that 90–100 ppb of SOLU-SEAL® effectively seals off loss zones and perforations in producing reservoirs.",
        "The supplied instructions call for mixing with a gradual increase starting at 40 ppb, with the pill physically checked during addition. Addition is to stop as needed so the pill remains pumpable.",
      ]}
      properties={[
        { label: "Appearance", value: "Tan white flakes & fibers" },
        { label: "Specific gravity", value: "2.0" },
        { label: "pH in water — 100 ppb", value: "Neutral" },
        { label: "Acid solubility — 15% HCl", value: "80%" },
      ]}
      safety={[
        "Normal precautions should be used for employee protection when handling chemical products.",
        "The use of an appropriate respirator, gloves and goggles is recommended for employee comfort and protection.",
        "The supplied product information states that SOLU-SEAL® does not have a restricted classification for transportation by international or domestic regulatory agencies.",
      ]}
    />
  );
}
