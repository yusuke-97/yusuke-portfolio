import Image from "next/image";

function Section({ id, title, img, alt, text }) {
  return (
    <div id={id} className="fade-in">
      <h3>{title}</h3>
      <div className="views-detail">
        <Image src={img} width={800} height={450} alt={alt} />
        <p className="detail">{text}</p>
      </div>
    </div>
  );
}

export default function WorkSections({ sections }) {
  return (
    <>
      {sections.map((section) => (
        <Section key={section.id} {...section} />
      ))}
    </>
  );
}
