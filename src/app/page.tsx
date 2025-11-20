"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_DATA } from "@/lib/constants";
import { useState, useEffect, memo, useRef } from "react";
import { fetchPublications, Publication } from "@/lib/scholarApi";
import { ImageCarousel } from "@/components/ImageCarousel";
import { ImageThumbnail } from "@/components/ImageThumbnail";
import { ImageGrid } from "@/components/ImageGrid";
import { MobileMenu } from "@/components/MobileMenu";
import { MuxVideoPlayer } from "@/components/MuxVideoPlayer";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Facebook,
  Instagram,
  Github,
  Linkedin,
  Twitter,
  ChevronDown,
  ArrowUp,
  Mail,
  GraduationCap,
  ExternalLink,
} from "lucide-react";

const getSocialIcon = (iconName: string) => {
  const iconProps = {
    size: 20,
    className:
      "text-gray-600 hover:text-[rgb(var(--secondary-color))] transition-colors",
  };

  switch (iconName) {
    case "facebook":
      return <Facebook {...iconProps} />;
    case "instagram":
      return <Instagram {...iconProps} />;
    case "github":
      return <Github {...iconProps} />;
    case "linkedin":
      return <Linkedin {...iconProps} />;
    case "twitter":
      return <Twitter {...iconProps} />;
    case "email":
      return <Mail {...iconProps} />;
    case "scholar":
      return <GraduationCap {...iconProps} />;
    default:
      return null;
  }
};

// Text parser component to handle bold and italic without dangerouslySetInnerHTML
const ParsedText = memo(({ text }: { text: string }) => {
  const parts = text.split(
    /(<strong>.*?<\/strong>|<em>.*?<\/em>|<a[^>]*>.*?<\/a>|<br\s*\/?>)/g
  );

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("<strong>")) {
          const content = part.replace(/<\/?strong>/g, "");
          return <strong key={index}>{content}</strong>;
        } else if (part.startsWith("<em>")) {
          const content = part.replace(/<\/?em>/g, "");
          return <em key={index}>{content}</em>;
        } else if (part.startsWith("<a")) {
          const hrefMatch = part.match(/href=['"]([^'"]*)['"]/);
          const textMatch = part.match(/>([^<]*)</);
          const href = hrefMatch ? hrefMatch[1] : "#";
          const linkText = textMatch ? textMatch[1] : "";
          return (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkText}
            </a>
          );
        } else if (part.match(/<br\s*\/?>/)) {
          return <br key={index} />;
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
});

// Typing animation component - isolated to prevent re-renders
const TypingAnimation = memo(({ text }: { text: string }) => {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      if (!isDeleting) {
        if (currentIndex <= text.length) {
          setTypedText(text.substring(0, currentIndex));
          currentIndex++;
          timeoutId = setTimeout(type, 100);
        } else {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            type();
          }, 2000);
        }
      } else {
        if (currentIndex > 0) {
          currentIndex--;
          setTypedText(text.substring(0, currentIndex));
          timeoutId = setTimeout(type, 50);
        } else {
          isDeleting = false;
          timeoutId = setTimeout(type, 500);
        }
      }
    };

    type();
    return () => clearTimeout(timeoutId);
  }, [text]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <>
      {typedText}
      <span className={showCursor ? "opacity-100" : "opacity-0"}>|</span>
    </>
  );
});

export default function Home() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [start, setStart] = useState(0);
  const [limit] = useState(10);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [carouselInitialIndex, setCarouselInitialIndex] = useState(0);
  const [carouselKey, setCarouselKey] = useState(0);
  const [previousImagesGroup, setPreviousImagesGroup] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState("");
  const [barStyle, setBarStyle] = useState({ left: 0, width: 0 });
  const navItemsRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const openCarousel = (images: string[], initialIndex: number = 0) => {
    // Check if we're opening a different image group
    const isDifferentGroup =
      JSON.stringify(previousImagesGroup) !== JSON.stringify(images);

    console.log("DIFF", isDifferentGroup);

    setCarouselImages(images);
    setPreviousImagesGroup(images);

    // If it's a different group, always start at 0, otherwise use the provided initialIndex
    setCarouselInitialIndex(isDifferentGroup ? 0 : initialIndex);
    setCarouselKey((prev) => prev + 1); // Force remount
    setCarouselOpen(true);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadPublications = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPublications(
          start,
          limit,
          PORTFOLIO_DATA.personal.scholarId,
          PORTFOLIO_DATA.personal.serpApiKey
        );
        setPublications(data.publications);
        setHasNext(data.hasNext);
        setHasPrev(data.hasPrev);

        // Scroll to publications section after data is loaded (only if not initial load)
        if (start > 0 || hasPrev || hasNext) {
          setTimeout(() => {
            const publicationsSection = document.getElementById("publications");
            if (publicationsSection) {
              publicationsSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }, 100);
        }
      } catch (error: any) {
        console.error("Failed to load publications:", error);
        setError(error.message || "Failed to load publications");
      } finally {
        setLoading(false);
      }
    };

    loadPublications();
  }, [start, limit]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
      const shouldShow = scrollTop > 200;
      setShowTopButton(shouldShow);

      // Track active section immediately
      const sections = [
        "work-focus",
        "recognitions",
        "featured-work",
        "publications",
        "beyond-research",
      ];

      let foundSection = false;
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            foundSection = true;
            break;
          }
        }
      }

      // If no section is active (in hero section), clear active section
      if (!foundSection) {
        const firstSection = document.getElementById("work-focus");
        if (firstSection && firstSection.getBoundingClientRect().top > 150) {
          setActiveSection("");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (activeSection && navItemsRef.current[activeSection]) {
      const activeElement = navItemsRef.current[activeSection];
      const navContainer = activeElement?.parentElement;
      if (activeElement && navContainer) {
        const containerRect = navContainer.getBoundingClientRect();
        const elementRect = activeElement.getBoundingClientRect();
        setBarStyle({
          left: elementRect.left - containerRect.left,
          width: elementRect.width,
        });
      }
    }
  }, [activeSection, mounted, isScrolled]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
          mounted && isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-300 shadow-lg"
            : "bg-white/80 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto flex justify-between items-stretch">
          <Link
            href="/"
            className={`flex items-center gap-3 cursor-pointer transition-all duration-500 ease-out ${
              mounted && isScrolled ? "py-2 px-8" : "py-4 px-8"
            }`}
          >
            <img
              src="/header-mark.png"
              alt={PORTFOLIO_DATA.personal.name}
              className={`transition-all duration-500 ease-out ${
                mounted && isScrolled ? "h-8" : "h-10"
              }`}
              suppressHydrationWarning
            />
            {mounted && isScrolled && (
              <span className="hidden md:block text-[rgb(var(--secondary-color))] font-semibold text-lg">
                {PORTFOLIO_DATA.personal.name}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-stretch relative">
            {PORTFOLIO_DATA.navigation.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  ref={(el) => {
                    navItemsRef.current[sectionId] = el;
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById(sectionId);
                    if (section) {
                      const navHeight = 80;
                      const sectionTop =
                        section.getBoundingClientRect().top +
                        window.scrollY -
                        navHeight;
                      window.scrollTo({
                        top: sectionTop,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`flex items-center px-6 cursor-pointer ${
                    isActive
                      ? "text-[rgb(var(--secondary-color))] font-semibold"
                      : "text-gray-600 hover:text-[rgb(var(--secondary-color))]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            {/* Active bar */}
            <div
              className="absolute bottom-0 h-1 bg-[rgb(var(--secondary-color))] rounded-t-full"
              style={{
                left: `${barStyle.left}px`,
                width: `${barStyle.width}px`,
                opacity: activeSection && barStyle.width > 0 ? 1 : 0,
              }}
            />
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden flex items-center ${
              mounted && isScrolled ? "py-2 px-8" : "py-4 px-8"
            }`}
          >
            <MobileMenu navigation={PORTFOLIO_DATA.navigation} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 z-20 overflow-hidden bg-white">
        <div
          className="portfolio-container text-center relative z-10"
          style={{ marginTop: "-50px" }}
        >
          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="hero-avatar bg-gray-600 overflow-hidden flex items-center justify-center relative">
              {mounted ? (
                showImage ? (
                  <img
                    src="/Profile/mk-color-1.jpg"
                    alt={`${PORTFOLIO_DATA.personal.name} - Profile Picture`}
                    className="w-full h-full object-cover"
                    onError={() => setShowImage(false)}
                  />
                ) : (
                  <div className="text-black text-6xl font-bold">
                    {PORTFOLIO_DATA.personal.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )
              ) : (
                <div className="text-black text-6xl font-bold">
                  {PORTFOLIO_DATA.personal.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
            </div>
          </div>

          {/* Greeting */}
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-3">
            {PORTFOLIO_DATA.hero.greeting}
          </h1>

          {/* Title */}
          <h2 className="text-lg md:text-xl font-bold text-black mb-4">
            Research Group Leader at{" "}
            <span className="text-[rgb(var(--secondary-color))]">KIT</span> &
            Honorary Associate Professor at{" "}
            <span className="text-[rgb(var(--secondary-color))]">UoN</span>
          </h2>

          {/* Social Icons */}
          <div className="flex justify-center space-x-6 mb-12">
            {PORTFOLIO_DATA.contact?.social?.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon"
              >
                {getSocialIcon(social.icon)}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll Down Button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={() => {
              const workFocusSection = document.getElementById("work-focus");
              workFocusSection?.scrollIntoView({ behavior: "smooth" });
            }}
            className="animate-bounce p-2 rounded-full transition-colors cursor-pointer hover:bg-[rgb(var(--secondary-color))]/20"
          >
            <ChevronDown
              size={24}
              className="text-gray-600 hover:text-[rgb(var(--secondary-color))] transition-colors"
            />
          </button>
        </div>
      </section>

      {/* Work Focus Section (merged with core work) */}
      <section id="work-focus" className="relative z-20 pt-16">
        <div className="portfolio-container">
          {/* Core Work - centered */}
          <div className="text-center mb-12">
            <div className="space-y-4">
              {PORTFOLIO_DATA.hero.coreWork?.map((work, index) => (
                <p
                  key={index}
                  className="core-work-bar-item"
                  style={
                    index == 0
                      ? {
                          color: "rgb(var(--secondary-color))",
                          marginBottom: "0px",
                          fontWeight: "700",
                        }
                      : {}
                  }
                >
                  {work}
                </p>
              ))}
            </div>
          </div>

          {/* Latest Publications */}
          {!loading && !error && publications.length > 0 && (
            <div className="max-w-4xl mx-auto mb-16">
              <div className="flex justify-center mb-6">
                <span className="inline-block px-6 py-2 bg-[rgb(var(--secondary-color))] text-white text-base font-semibold rounded-full">
                  Latest Publications
                </span>
              </div>
              <div className="space-y-4">
                {publications.slice(0, 2).map((publication, index) => (
                  <div
                    key={index}
                    className="text-left bg-white/30 p-4 rounded-lg border border-gray-200"
                  >
                    <h4 className="text-lg font-semibold text-[rgb(var(--secondary-color))] mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                      {publication.title}
                    </h4>
                    <p className="text-sm text-gray-700 mb-2 font-medium">
                      {publication.authors}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-700 font-medium">
                      <span>{publication.venue}</span>
                      <span>•</span>
                      <span>{publication.year}</span>
                      {publication.url && (
                        <>
                          <span>•</span>
                          <a
                            href={publication.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[rgb(var(--secondary-color))] hover:underline"
                          >
                            View Paper
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Three Landing Photos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            {PORTFOLIO_DATA.landingPhotos.map((image, index) => (
              <img
                key={index}
                src={`/${image}`}
                alt={`Landing photo ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() =>
                  openCarousel(PORTFOLIO_DATA.landingPhotos, index)
                }
              />
            ))}
          </div>

          {/* Work Focus Content - no title */}
          <div className="space-y-8">
            {PORTFOLIO_DATA.workFocus?.paragraphs.map((paragraph, index) => (
              <p key={index} className="work-focus-text">
                <ParsedText text={paragraph.text} />
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider relative z-20">
        <div className="section-divider-line"></div>
      </div>

      {/* Recognitions Section */}
      <section id="recognitions" className="section-spacing relative z-20">
        <div className="portfolio-container">
          <h2 className="work-focus-title">
            {PORTFOLIO_DATA.recognitions?.title || "Recognitions"}
          </h2>
          <div>
            {/* Image floated to the left */}
            <img
              src="/lgbf-4.jpg"
              alt="Recognition"
              className="float-left mr-6 mb-6 w-full md:w-1/2 h-auto rounded-lg shadow-lg"
              style={{ marginTop: "10px" }}
            />
            {/* Text flows around and below the image */}
            <div className="space-y-8">
              {PORTFOLIO_DATA.recognitions?.paragraphs.map(
                (paragraph, index) => (
                  <p key={index} className="work-focus-text">
                    <ParsedText text={paragraph.text} />
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider relative z-20">
        <div className="section-divider-line"></div>
      </div>

      {/* Featured Work Section */}
      <section id="featured-work" className="section-spacing relative z-20">
        <div className="portfolio-container">
          <h2 className="work-focus-title text-center">
            {PORTFOLIO_DATA.featuredWork?.title || "Featured Work"}
          </h2>
          <div className="space-y-6">
            {PORTFOLIO_DATA.featuredWork?.categories.map((category, index) => (
              <div key={index} className="featured-work-block relative">
                <div className="cursor-pointer">
                  <div className="flex-1">
                    <h3 className="featured-work-block-title">
                      {category.title}
                    </h3>

                    {/* Collapsed view: Media and description side by side on desktop */}
                    {!expandedCategories.includes(index) ? (
                      <>
                        <div className="flex flex-col md:flex-row gap-6 mt-4">
                          {/* Media section (video and images stacked vertically) */}
                          {(category.videoLink ||
                            (category.images &&
                              category.images.length > 0)) && (
                            <div
                              className="flex flex-col gap-6 md:w-auto"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {/* Video Thumbnail */}
                              {category.muxAssetId && (
                                <div className="relative w-full md:w-80 h-52 rounded-lg overflow-hidden border border-gray-300 hover:border-[rgb(var(--secondary-color))] transition-all duration-300 shadow-lg flex-shrink-0">
                                  <MuxVideoPlayer
                                    playbackId={category.muxAssetId}
                                    className="w-full h-full"
                                    thumbnailTime={10}
                                  />
                                </div>
                              )}

                              {/* Image Thumbnail */}
                              {category.images &&
                                category.images.length > 0 && (
                                  <div className="flex-shrink-0">
                                    <ImageThumbnail
                                      images={category.images}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openCarousel(category.images, 0);
                                      }}
                                    />
                                  </div>
                                )}
                            </div>
                          )}

                          {/* Description and Work items - same level */}
                          <div
                            className="flex-1 flex flex-col gap-6"
                            style={{ marginLeft: "15px" }}
                          >
                            {/* Description text */}
                            <p className="featured-work-block-description">
                              {category.description}
                            </p>

                            {/* Work items */}
                            <div className="space-y-3 relative pb-8">
                              {category.selectedWorks
                                .slice(0, 3)
                                .map((work, workIndex) => (
                                  <div
                                    key={workIndex}
                                    className="featured-work-item"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="flex-1">
                                      <a
                                        href={work.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="featured-work-item-title hover:underline cursor-pointer"
                                      >
                                        {work.title}
                                      </a>
                                      <p className="featured-work-item-description">
                                        {work.description}
                                      </p>
                                    </div>
                                    <a
                                      href={work.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="featured-work-link-icon"
                                    >
                                      <ExternalLink size={20} />
                                    </a>
                                  </div>
                                ))}

                              {/* Gradient overlay with "Show more" button */}
                              {category.selectedWorks.length > 3 && (
                                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-4">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedCategories((prev) =>
                                        prev.includes(index)
                                          ? prev.filter((i) => i !== index)
                                          : [...prev, index]
                                      );
                                    }}
                                    className="flex flex-col items-center gap-1 text-gray-600 font-medium cursor-pointer hover:text-[rgb(var(--secondary-color))] transition-colors px-4 py-2"
                                  >
                                    <span>Show more</span>
                                    <ChevronDown size={20} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="featured-work-block-description">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>

                {expandedCategories.includes(index) && (
                  <div className="featured-work-list">
                    {/* Video Embed */}
                    {category.muxAssetId && (
                      <div className="mb-6 w-full max-w-4xl mx-auto">
                        <MuxVideoPlayer
                          playbackId={category.muxAssetId}
                          className="w-full rounded-lg"
                          thumbnailTime={10}
                        />
                      </div>
                    )}

                    {/* Image Grid */}
                    {category.images && category.images.length > 0 && (
                      <div className="mb-6">
                        <ImageGrid
                          images={category.images}
                          onImageClick={(imageIndex) =>
                            openCarousel(category.images, imageIndex)
                          }
                        />
                      </div>
                    )}

                    {/* Selected Works */}
                    <div className="space-y-3">
                      {category.selectedWorks.map((work, workIndex) => (
                        <div key={workIndex} className="featured-work-item">
                          <div className="flex-1">
                            <a
                              href={work.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="featured-work-item-title hover:underline cursor-pointer"
                            >
                              {work.title}
                            </a>
                            <p className="featured-work-item-description">
                              {work.description}
                            </p>
                          </div>
                          <a
                            href={work.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="featured-work-link-icon"
                          >
                            <ExternalLink size={20} />
                          </a>
                        </div>
                      ))}

                      {/* Show less button */}
                      <div className="flex justify-center pt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedCategories((prev) =>
                              prev.filter((i) => i !== index)
                            );
                          }}
                          className="flex flex-col items-center gap-1 text-gray-600 font-medium cursor-pointer hover:text-[rgb(var(--secondary-color))] transition-colors px-4 py-2"
                        >
                          <ChevronDown size={20} className="rotate-180" />
                          <span>Show less</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider relative z-20">
        <div className="section-divider-line"></div>
      </div>

      {/* Publications Section */}
      <section id="publications" className="section-spacing relative z-20">
        <div className="portfolio-container">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h2 className="work-focus-title mb-0">
              {PORTFOLIO_DATA.publications?.title || "Publications"}
            </h2>
            <a
              href={`https://scholar.google.de/citations?user=${PORTFOLIO_DATA.personal.scholarId}&hl=de`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-800 text-base font-normal rounded-md border border-gray-300 hover:bg-[rgb(var(--secondary-color))] hover:text-white hover:border-[rgb(var(--secondary-color))] transition-all duration-300 md:self-start"
            >
              As listed on Google Scholar
            </a>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="work-focus-text">Loading publications...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p
                className="work-focus-text"
                style={{ color: "rgb(239, 68, 68)" }}
              >
                Error loading publications
              </p>
              <p
                className="work-focus-text"
                style={{ fontSize: "16px", color: "#9ca3af" }}
              >
                {error}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {publications.map((publication, index) => (
                  <div key={index} className="publication-item">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-6">
                      <div className="flex-1">
                        <h3 className="publication-title">
                          {publication.title}
                        </h3>
                        <p className="publication-authors mb-2">
                          {publication.authors}
                        </p>
                        <div className="flex flex-col md:flex-row md:items-center md:flex-wrap gap-2 md:gap-4 mt-2">
                          <span className="publication-meta">
                            {publication.venue}
                          </span>
                          <span className="publication-meta">
                            Citations: {publication.citations}
                          </span>
                          {publication.url && (
                            <a
                              href={publication.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="publication-link"
                            >
                              <ExternalLink size={16} className="inline mr-1" />
                              View Paper
                            </a>
                          )}
                        </div>
                      </div>
                      <span className="publication-year md:block hidden">
                        {publication.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {(hasNext || hasPrev) && (
                <div className="mt-12">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setStart((prev) => Math.max(0, prev - limit))
                          }
                          className={
                            !hasPrev
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      <PaginationItem className="hidden md:block">
                        <span className="text-gray-600 px-4">
                          Showing {start + 1} - {start + publications.length}
                        </span>
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setStart((prev) => prev + limit)}
                          className={
                            !hasNext
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider relative z-20">
        <div className="section-divider-line"></div>
      </div>

      {/* Beyond the Research Section */}
      <section
        id="beyond-research"
        className="section-spacing relative z-20 mb-16"
      >
        <div className="portfolio-container">
          <h2 className="work-focus-title">
            {PORTFOLIO_DATA.beyondResearch?.title || "Beyond the Research"}
          </h2>

          <div className="space-y-8">
            {PORTFOLIO_DATA.beyondResearch?.sections.map((section, index) => (
              <div key={index}>
                <h3 className="beyond-research-subtitle">{section.title}</h3>
                <p className="work-focus-text">
                  <ParsedText text={section.text} />
                </p>

                {/* Video Embed */}
                {section.videoLink && (
                  <div className="mt-6 w-full max-w-full">
                    <iframe
                      width="100%"
                      height="450"
                      src={section.videoLink.replace("watch?v=", "embed/")}
                      title="YouTube video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg max-w-full"
                      style={{
                        maxWidth: "800px",
                        margin: "0 auto",
                        display: "block",
                      }}
                    ></iframe>
                  </div>
                )}

                {/* Images Grid */}
                {section.images && section.images.length > 0 && (
                  <div className="mt-6">
                    <ImageGrid
                      images={section.images}
                      onImageClick={(imageIndex) =>
                        openCarousel(section.images, imageIndex)
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fixed Back to Top Button */}
      <Button
        variant="outline"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 p-0 flex items-center justify-center border-gray-400 text-gray-600 hover:text-black hover:border-[rgb(var(--secondary-color))] hover:bg-[rgb(var(--secondary-color))]/20 bg-white/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ${
          mounted && showTopButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp size={20} />
      </Button>

      {/* Image Carousel Modal */}
      <ImageCarousel
        key={carouselKey}
        images={carouselImages}
        isOpen={carouselOpen}
        onClose={() => setCarouselOpen(false)}
        initialIndex={carouselInitialIndex}
      />
    </div>
  );
}
