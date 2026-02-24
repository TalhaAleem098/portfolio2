"use client";

import { useRef, useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HIDE = { opacity: 0, transform: "translateY(30px)" };

export default function Testimonials() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScroll, setCanScroll] = useState({ prev: false, next: true });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  const testimonials = [
    {
      quote: "Aleem transformed our website with his exceptional design skills and technical expertise. The user feedback has been phenomenal!",
      author: "Emily Carter",
      position: "Product Manager at TechNova",
    },
    {
      quote: "Aleem's attention to detail and user-centric approach resulted in a beautiful and functional platform that our customers love.",
      author: "Sophia Lee",
      position: "Marketing Lead at GreenSpaces",
    },
    {
      quote: "Aleem is a rare talent who excels at both UI/UX design and full-stack development. He delivered our project on time and with perfection.",
      author: "Michael Grant",
      position: "Operations Manager at Bright",
    },
    {
      quote: "Working with Aleem was an absolute game-changer. His innovative solutions helped us achieve our business goals faster than expected.",
      author: "Jessica Morgan",
      position: "CEO at Digital Innovations",
    },
    {
      quote: "The attention to detail and commitment to excellence is unmatched. Every project detail was handled with care and professionalism.",
      author: "David Chen",
      position: "Founder at CreativeHub",
    },
    {
      quote: "His expertise in both design and development made our project seamless. Highly recommend Aleem for anyone looking for top-tier talent.",
      author: "Sarah Wilson",
      position: "Director at TechForward",
    },
  ];

  // Update scroll state based on current index
  const updateScrollState = (idx) => {
    setCurrentIndex(idx);
    setCanScroll({
      prev: idx > 0,
      next: idx < testimonials.length - 1,
    });
  };

  // Scroll to specific card
  const scrollToCard = (index) => {
    const container = containerRef.current;
    if (!container) return;

    const card = container.querySelector(`[data-index="${index}"]`);
    if (!card) return;

    const containerLeft = container.getBoundingClientRect().left;
    const cardLeft = card.getBoundingClientRect().left;
    const offset = cardLeft - containerLeft;

    container.scrollTo({
      left: container.scrollLeft + offset,
      behavior: "smooth",
    });

    updateScrollState(index);
  };

  // Handle button clicks
  const handleButtonScroll = (direction) => {
    const newIndex =
      direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < testimonials.length) {
      scrollToCard(newIndex);
    }
  };

  // Handle drag
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    // Scroll container will handle native drag scrolling
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // Check which card is most visible
      const container = containerRef.current;
      if (!container) return;

      const cards = container.querySelectorAll("[data-index]");
      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card) => {
        const cardLeft = card.getBoundingClientRect().left;
        const containerLeft = container.getBoundingClientRect().left;
        const distance = Math.abs(cardLeft - containerLeft);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = parseInt(card.getAttribute("data-index"));
        }
      });

      updateScrollState(closestIndex);
    }
  };

  // Handle scroll event
  const handleScrollEvent = (e) => {
    if (isDragging) return;

    const container = e.currentTarget;
    const cards = container.querySelectorAll("[data-index]");
    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card) => {
      const cardLeft = card.getBoundingClientRect().left;
      const containerLeft = container.getBoundingClientRect().left;
      const distance = Math.abs(cardLeft - containerLeft);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = parseInt(card.getAttribute("data-index"));
      }
    });

    setCurrentIndex(closestIndex);
    setCanScroll({
      prev: closestIndex > 0,
      next: closestIndex < testimonials.length - 1,
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power2.out" },
      });

      tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.5 })
        .to(cardsRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="bg-white mx-1 md:mx-1 lg:mx-5 py-8 md:py-12 lg:py-16">
      <div className="px-3 md:px-6 lg:px-12 xl:px-16 pt-8 md:pt-12 lg:pt-20">
        <div ref={headerRef} style={HIDE} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8 lg:mb-12">
          <h2 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-[1.05] uppercase">
            Testimonials
          </h2>
          <div className="flex gap-2 md:gap-4">
            <button
              onClick={() => handleButtonScroll("prev")}
              disabled={!canScroll.prev}
              className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all ${
                canScroll.prev
                  ? "bg-[#FDF94B] hover:bg-[#e8e410] cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed opacity-50"
              }`}
              aria-label="Previous testimonial"
            >
              <FiArrowLeft size={18} className="md:text-[24px] text-black" />
            </button>
            <button
              onClick={() => handleButtonScroll("next")}
              disabled={!canScroll.next}
              className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all ${
                canScroll.next
                  ? "bg-[#FDF94B] hover:bg-[#e8e410] cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed opacity-50"
              }`}
              aria-label="Next testimonial"
            >
              <FiArrowRight size={18} className="md:text-[24px] text-black" />
            </button>
          </div>
        </div>

        <div
          ref={cardsRef}
          style={HIDE}
        >
        <div
          ref={containerRef}
          onScroll={handleScrollEvent}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              data-index={idx}
              className={`snap-start shrink-0 w-[85vw] md:w-[60vw] lg:w-[40vw] ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              } bg-gray-100 rounded-lg p-4 md:p-6 lg:p-8 flex flex-col justify-between min-h-96 hover:shadow-lg transition-shadow`}
            >
              <p className="text-gray-700 text-xs md:text-sm lg:text-base font-medium leading-relaxed mb-6 md:mb-8 lg:mb-12">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gray-400 flex items-center justify-center shrink-0">
                  <FaUser size={20} className="md:text-[24px] text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm md:text-base lg:text-lg font-black uppercase tracking-tight truncate">
                    {testimonial.author}
                  </h4>
                  <p className="text-[10px] md:text-xs lg:text-sm text-gray-600 font-medium uppercase tracking-wide truncate">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
