"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_DATA } from "@/lib/constants";
import { useState, useEffect } from "react";
import { fetchPublications, Publication } from "@/lib/scholarApi";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
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
    className: "text-gray-400 hover:text-[rgb(49,132,128)] transition-colors",
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
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const fullText = PORTFOLIO_DATA.hero.title;
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      if (!isDeleting) {
        // Typing
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.substring(0, currentIndex));
          currentIndex++;
          timeoutId = setTimeout(type, 100); // Typing speed
        } else {
          // Pause at the end for 2 seconds
          timeoutId = setTimeout(() => {
            isDeleting = true;
            type();
          }, 2000);
        }
      } else {
        // Deleting
        if (currentIndex > 0) {
          currentIndex--;
          setTypedText(fullText.substring(0, currentIndex));
          timeoutId = setTimeout(type, 50); // Deleting speed (faster)
        } else {
          // Start typing again
          isDeleting = false;
          timeoutId = setTimeout(type, 500); // Pause before retyping
        }
      }
    };

    type();

    return () => clearTimeout(timeoutId);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
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
      // Debug log - remove this later
      console.log("Scroll position:", scrollTop, "Show button:", shouldShow);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md border-b border-gray-700 shadow-lg py-2"
            : "bg-black/80 backdrop-blur-sm border-b border-transparent py-4"
        }`}
      >
        <div className="portfolio-container">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className={`text-white font-bold transition-all duration-300 cursor-pointer ${
                isScrolled ? "text-lg" : "text-xl"
              }`}
            >
              {PORTFOLIO_DATA.personal.name}
            </Link>
            <div className="flex space-x-6 ml-12">
              {PORTFOLIO_DATA.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link transition-all duration-300 cursor-pointer ${
                    isScrolled ? "text-xs" : "text-xs"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 z-20 overflow-hidden">
        {/* Video Background - Hero Only */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/banner.mp4" type="video/mp4" />
          </video>
          {/* Black Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/90"></div>
        </div>

        <div className="portfolio-container text-center relative z-10">
          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="hero-avatar bg-gray-600 overflow-hidden flex items-center justify-center relative">
              {mounted ? (
                showImage ? (
                  <img
                    src="/avatar.jpg"
                    alt={`${PORTFOLIO_DATA.personal.name} - Profile Picture`}
                    className="w-full h-full object-cover"
                    onError={() => setShowImage(false)}
                  />
                ) : (
                  <div className="text-white text-6xl font-bold">
                    {PORTFOLIO_DATA.personal.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )
              ) : (
                <div className="text-white text-6xl font-bold">
                  {PORTFOLIO_DATA.personal.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
            </div>
          </div>

          {/* Name with typing animation */}
          <h1 className="hero-name-large mb-12">
            {typedText}
            <span className={showCursor ? "opacity-100" : "opacity-0"}>|</span>
          </h1>

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
              const coreWorkSection = document.getElementById("core-work");
              coreWorkSection?.scrollIntoView({ behavior: "smooth" });
            }}
            className="animate-bounce p-2 rounded-full transition-colors cursor-pointer hover:bg-[rgb(49,132,128)]/20"
          >
            <ChevronDown
              size={24}
              className="text-gray-400 hover:text-[rgb(49,132,128)] transition-colors"
            />
          </button>
        </div>
      </section>

      {/* Core Work & Introduction Bar */}
      <section
        id="core-work"
        className="w-full py-16 z-20 relative core-work-section"
      >
        <div className="portfolio-container text-center">
          {/* Core Work */}
          <div className="mb-12">
            <div className="space-y-4">
              {PORTFOLIO_DATA.hero.coreWork?.map((work, index) => (
                <p
                  key={index}
                  className="core-work-bar-item"
                  style={
                    index == 0 ? { color: "white", marginBottom: "0px" } : {}
                  }
                >
                  {work}
                </p>
              ))}
            </div>
          </div>

          {/* Introduction */}
          <div>
            <p className="core-work-bar-intro max-w-4xl mx-auto">
              {PORTFOLIO_DATA.hero.introduction}
            </p>
          </div>
        </div>
      </section>

      {/* Work Focus Section */}
      <section id="work-focus" className="relative z-20 pt-16">
        <div className="portfolio-container">
          <h2 className="work-focus-title">
            {PORTFOLIO_DATA.workFocus?.title || "Work Focus"}
          </h2>
          <div className="space-y-8">
            {PORTFOLIO_DATA.workFocus?.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="work-focus-text"
                dangerouslySetInnerHTML={{ __html: paragraph.text }}
              />
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
          <div className="space-y-8">
            {PORTFOLIO_DATA.recognitions?.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="work-focus-text"
                dangerouslySetInnerHTML={{ __html: paragraph.text }}
              />
            ))}
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
          <h2 className="featured-work-title text-center">
            {PORTFOLIO_DATA.featuredWork?.title || "Featured Work"}
          </h2>
          <div className="space-y-6">
            {PORTFOLIO_DATA.featuredWork?.categories.map((category, index) => (
              <div key={index} className="featured-work-block">
                <div
                  className="featured-work-header cursor-pointer"
                  onClick={() => {
                    setExpandedCategories((prev) =>
                      prev.includes(index)
                        ? prev.filter((i) => i !== index)
                        : [...prev, index]
                    );
                  }}
                >
                  <div className="flex-1">
                    <h3 className="featured-work-block-title">
                      {category.title}
                    </h3>
                    <p className="featured-work-block-description">
                      {category.description}
                    </p>
                  </div>
                  <ChevronDown
                    size={24}
                    className={`featured-work-chevron ${
                      expandedCategories.includes(index) ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {expandedCategories.includes(index) && (
                  <div className="featured-work-list">
                    {category.selectedWorks.map((work, workIndex) => (
                      <div key={workIndex} className="featured-work-item">
                        <div className="flex-1">
                          <h4 className="featured-work-item-title">
                            {work.title}
                          </h4>
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
          <h2 className="work-focus-title">
            {PORTFOLIO_DATA.publications?.title || "Publications"}
          </h2>

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
                    <div className="flex justify-between items-start gap-6">
                      <div className="flex-1">
                        <h3 className="publication-title">
                          {publication.title}
                        </h3>
                        <p className="publication-authors mb-2">
                          {publication.authors}
                        </p>
                        <div className="flex items-center flex-wrap gap-4 mt-2">
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
                      <span className="publication-year">
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

                      <PaginationItem>
                        <span className="text-gray-400 px-4">
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

      {/* Awards Section */}
      <section id="awards" className="section-spacing relative z-20">
        <div className="portfolio-container">
          <h2 className="work-focus-title">
            {PORTFOLIO_DATA.awards?.title || "Awards"}
          </h2>

          <div className="space-y-4">
            {PORTFOLIO_DATA.awards?.items?.map((award, index) => (
              <div key={index} className="award-item">
                <p className="work-focus-text">{award}</p>
              </div>
            )) || []}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider relative z-20">
        <div className="section-divider-line"></div>
      </div>

      {/* Academic Functions & Activities Section */}
      <section
        id="academic"
        className="section-spacing relative z-20"
        style={{ paddingBottom: "50px" }}
      >
        <div className="portfolio-container">
          <h2 className="work-focus-title">
            {PORTFOLIO_DATA.academicFunctions?.title ||
              "Academic Functions & Activities"}
          </h2>

          <div className="space-y-4">
            {PORTFOLIO_DATA.academicFunctions?.items?.map((activity, index) => (
              <div key={index} className="award-item">
                <p className="work-focus-text">{activity}</p>
              </div>
            )) || []}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="section-spacing relative z-20 pb-24 contact-section overflow-hidden"
      >
        <div className="portfolio-container">
          <h2 className="work-focus-title">
            {PORTFOLIO_DATA.contact?.title || "Contact"}
          </h2>

          <div className="grid grid-cols-2 gap-16 mt-8">
            <div className="space-y-6">
              <div>
                <h3 className="contact-section-label">Group</h3>
                <p className="contact-section-info">
                  {PORTFOLIO_DATA.contact?.office?.group || ""}
                </p>
              </div>

              <div>
                <h3 className="contact-section-label">Office Hours</h3>
                <p className="contact-section-info">
                  {PORTFOLIO_DATA.contact?.office?.officeHours || ""}
                </p>
              </div>

              <div>
                <h3 className="contact-section-label">Room</h3>
                <p className="contact-section-info">
                  {PORTFOLIO_DATA.contact?.office?.room || ""}
                </p>
              </div>

              <div>
                <h3 className="contact-section-label">Phone</h3>
                <p className="contact-section-info">
                  {PORTFOLIO_DATA.contact?.office?.phone || ""}
                </p>
              </div>

              <div>
                <h3 className="contact-section-label">Email</h3>
                <a
                  href={`mailto:${PORTFOLIO_DATA.contact?.office?.email || ""}`}
                  className="contact-section-info"
                >
                  {PORTFOLIO_DATA.contact?.office?.email || ""}
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="contact-section-label">Institution</h3>
                <p className="contact-section-info">
                  {PORTFOLIO_DATA.contact?.office?.institution || ""}
                </p>
                <p className="contact-section-info">
                  {PORTFOLIO_DATA.contact?.office?.faculty || ""}
                </p>
                <p className="contact-section-info">
                  {PORTFOLIO_DATA.contact?.office?.institute || ""}
                </p>
                <p className="contact-section-info mt-4">
                  {PORTFOLIO_DATA.contact?.office?.address || ""}
                </p>
              </div>

              {/* Social Media Icons */}
              <div>
                <h3 className="contact-section-label mb-4">Connect</h3>
                <div className="flex space-x-4">
                  {PORTFOLIO_DATA.contact?.social?.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-gray-600 hover:border-[rgb(49,132,128)] hover:bg-[rgb(49,132,128)]/20 transition-all duration-300"
                    >
                      {getSocialIcon(social.icon)}
                    </a>
                  )) || []}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Back to Top Button */}
      <Button
        variant="outline"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 p-3 border-gray-600 text-gray-400 hover:text-white hover:border-[rgb(49,132,128)] hover:bg-[rgb(49,132,128)]/20 bg-black/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ${
          showTopButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp size={20} />
      </Button>
    </div>
  );
}
