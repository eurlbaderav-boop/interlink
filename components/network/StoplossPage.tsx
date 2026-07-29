import DrilchemProductPage from "./DrilchemProductPage";

export default function StoplossPage() {
  return (
    <DrilchemProductPage
      productName="STOPLOSS®"
      productIndex="03"
      productLogo="/herophotos/STOPLOS.png"
      accent="#d97816"
      valueAccent="#173f67"
      presentationVideo={{
        src: "/herophotos/fracseal-stoploss.mp4",
        poster: "/herophotos/fracseal-stoploss-poster.png",
        label: "VIDEO PRESENTATION",
        caption: "STOPLOSS® Product Presentation",
      }}
      introduction="STOPLOSS® is used as a reactive LCM pill for curing severe to total losses greater than 60 bph in highly porous formations, using lower concentrations and volumes than conventional LCM formulations."
      descriptionParagraphs={[
        "STOPLOSS® is a proprietary, single-sack, broad-spectrum blend of sized and shaped materials designed to be effective in curing severe to total loss circulation.",
        "The supplied product information describes it as suitable for use in highly fractured or vugular formations without the addition of other conventional lost-circulation material.",
      ]}
      packaging={{
        amount: "25",
        unit: "lb",
        metric: "11.34 kg",
        copy: "STOPLOSS® is packaged in multi-wall paper bags.",
      }}
      treatment={[
        "STOPLOSS® is packaged so it can be used in remote areas or where space for materials storage is limited. The supplied product information describes it as thermally stable above 450°F, 100% biodegradable and suitable for use in all types of drilling fluids.",
        "For severe to total loss circulation across thief zones and for use as a pre-cementing spacer, the reference states that 60–100 bbl pill applications can be spotted using up to 300 lb of STOPLOSS® slurry at a concentration of 50–80 ppb with pre-hydrated bentonite or base mud.",
      ]}
      properties={[
        { label: "Colour", value: "Light tan / brown" },
        { label: "Form", value: "Specialty blend of graded sealing particles" },
        { label: "pH in water", value: "6.5 – 7.5" },
      ]}
      safety={[
        "Appropriate respirator, gloves, goggles and apron are recommended for employee comfort and protection.",
        "The supplied product information states that STOPLOSS® is non-toxic and considers it harmless in the marine ecosystem.",
        "It also states that STOPLOSS® does not have a restricted classification for transportation by international or domestic regulatory agencies.",
        "The supplied product information refers users to the Material Safety Data Sheet for specific details.",
      ]}
    />
  );
}
