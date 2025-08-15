import Image from "next/image";
import { getSections } from "@/app/data/workSections";

export default function WorkSections({
  project,
  sections,
  showOverview = true,
  overviewIcon = "/img/works-detail/gear-icon.svg",
  overviewIconSize = { w: 28, h: 28 },
  className = "",
}) {
  
  const items = sections ?? (project ? getSections(project) : []) ?? [];
  if (!items.length) return null;

  return (
    <div className={`work-sections ${className}`} data-project={project || ""}>
      {showOverview && (
        <ul className="overview-list">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>
                <Image
                  className="overview-list-img"
                  src={overviewIcon}
                  width={overviewIconSize.w}
                  height={overviewIconSize.h}
                  alt=""
                  aria-hidden="true"
                />
                <span className="text">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {items.map(({ id, title, img, alt, text }) => (
        <div id={id} key={id} className="fade-in article-part">
          <h2>{title}</h2>
          <div className="views-detail">
            <Image src={img} width={1908} height={2230} alt={alt} />
            <p className="detail">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
