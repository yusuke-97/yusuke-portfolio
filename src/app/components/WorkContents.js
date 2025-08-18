import Image from "next/image";
import { getBlocks, getSections } from "@/app/data/workContents";

export default function WorkContents(props) {
  const {
    project,
    sections,
    overviewIcon = "/img/works-detail/gear-icon.svg",
    overviewIconSize = { w: 28, h: 28 },
    order = ["intro", "summary", "layout", "content", "emphasis", "coding"],
  } = props;

  const raw = project ? getBlocks(project) : {};
  const items = sections ?? getSections(project) ?? [];

  function renderBodyWithTagIcon(text) {
    if (!text) return null;
    const parts = String(text).split(/『\s*』/);
    if (parts.length === 1) return text;

    return parts.flatMap((part, i) => (
      i === 0
        ? [part]
        : [
            <Image
              key={`icon-${i}`}
              src="/img/works-detail/tag-icon.svg"
              alt=""
              aria-hidden="true"
              className="inline-tag-icon"
              width={16}
              height={16}
            />,
            part,
          ]
    ));
  }


  const normalizeImage = (img) => {
    if (!img) return null;
    if (typeof img === "string") {
      return { src: img, width: 800, height: 450, alt: "" };
    }
    if (typeof img === "object" && img.src) {
      return {
        src: img.src,
        width: img.width ?? 800,
        height: img.height ?? 450,
        alt: img.alt ?? "",
      };
    }
    return null;
  };

  const intro = {
    heading: raw?.intro?.heading,
    body: raw?.intro?.body,
  };

  const summary = {
    heading: raw?.summary?.heading,
    body: raw?.summary?.body,
  };

  const layout = {
    heading: raw?.layout?.heading,
    body: raw?.layout?.body,
  };

  const emph = {
    heading: raw?.emphasis?.heading,
    image: normalizeImage(raw?.emphasis?.image),
    body: raw?.emphasis?.body,
  };

  const coding = {
    heading: raw?.coding?.heading,
    body: raw?.coding?.body,
  };

  const blocks = {
    intro: {
      show: !!(intro.heading || intro.body),
      render: () => (
        <div className="article-part fade-in">
          {intro.heading && <h2>{intro.heading}</h2>}
          {intro.body && <p>{intro.body}</p>}
        </div>
      ),
    },
    summary: {
      show: !!(summary.heading || summary.body),
      render: () => (
        <div className="article-part fade-in">
          {summary.heading && <h2>{summary.heading}</h2>}
          {summary.body && <p>{summary.body}</p>}
        </div>
      ),
    },
    layout: {
      show: !!(layout.heading || layout.body),
      render: () => (
        <div className="article-part fade-in">
          {layout.heading && <h2>{layout.heading}</h2>}
          {layout.body && <p>{layout.body}</p>}
        </div>
      ),
    },
    content: {
      show: items.length > 0,
      render: () => (
        <>
          {(
            <ul className="overview-list fade-in">
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

          {items.map(({ id, title, img, alt, text, width = 1908, height = 2230 }) => (
            <div id={id} key={id} className="fade-in article-part">
              <h2>{title}</h2>
              <div className="views-detail">
                <Image src={img} width={width} height={height} alt={alt} />
                {text && <p className="detail">{text}</p>}
              </div>
            </div>
          ))}
        </>
      ),
    },
    emphasis: {
      show: !!(emph.heading || emph.body || emph.image),
      render: () => (
        <div className="article-part fade-in">
          {emph.heading && <h2>{emph.heading}</h2>}
          <div className="views-detail">
            {emph.image && (
              <Image
                src={emph.image.src}
                width={emph.image.width}
                height={emph.image.height}
                alt={emph.image.alt}
              />
            )}
            {emph.body && <p className="detail">{renderBodyWithTagIcon(emph.body)}</p>}
          </div>
        </div>
      ),
    },
    coding: {
      show: !!(coding.heading || coding.body),
      render: () => (
        <div className="article-part fade-in">
          {coding.heading && <h2>{coding.heading}</h2>}
          {coding.body && <p>{coding.body}</p>}
        </div>
      ),
    },
  };

  const hasAny = order.some((k) => blocks[k]?.show);
  if (!hasAny) return null;

  return (
    <div className="work-sections" data-project={project || ""}>
      {order.map((k) => (blocks[k]?.show ? <div key={k}>{blocks[k].render()}</div> : null))}
    </div>
  );
}
