/* 5 Barbers · Melville, NY — front-of-house scripts */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Hours: [openHour, closeHour] in 24h local time, null = closed.
     Index = JS getDay() (0 Sunday … 6 Saturday).
  ------------------------------------------------------------------ */
  var HOURS = [
    [8, 17],  // Sun
    [10, 16], // Mon
    [8, 18],  // Tue
    [8, 18],  // Wed
    [8, 18],  // Thu
    [8, 18],  // Fri
    null      // Sat
  ];
  var DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function fmtHour(h) {
    if (h === 12) return "noon";
    return h < 12 ? h + " AM" : (h - 12) + " PM";
  }

  function nextOpening(now) {
    // walk forward through the week to find the next open slot
    for (var i = 0; i < 7; i++) {
      var day = (now.getDay() + i) % 7;
      var slot = HOURS[day];
      if (!slot) continue;
      if (i === 0 && now.getHours() >= slot[1]) continue; // already closed today
      var label = i === 0 ? "today" : (i === 1 ? "tomorrow" : DAY_NAMES[day]);
      return { label: label, hour: slot[0] };
    }
    return null;
  }

  function renderStatus() {
    var el = document.getElementById("openStatus");
    var todayLine = document.getElementById("todayLine");
    var now = new Date();
    var slot = HOURS[now.getDay()];
    var open = !!slot && now.getHours() >= slot[0] && now.getHours() < slot[1];

    if (el) {
      if (open) {
        el.innerHTML = '<span class="dot dot--open"></span>Open now — the pole is spinning · till ' + fmtHour(slot[1]);
      } else {
        var next = nextOpening(now);
        el.innerHTML = '<span class="dot dot--closed"></span>Closed right now' +
          (next ? " — back " + next.label + " at " + fmtHour(next.hour) : "");
      }
    }

    if (todayLine) {
      todayLine.textContent = open
        ? "Chairs are turning — come on down."
        : (slot ? "Today: " + fmtHour(slot[0]) + " to " + fmtHour(slot[1]) + "." : "Sundays we're in, Saturdays we rest.");
    }

    // highlight today's row on the hours table
    var row = document.querySelector('#hoursTable tr[data-day="' + now.getDay() + '"]');
    if (row) row.classList.add("is-today");
  }

  renderStatus();
  // re-check every minute so a tab left open flips over correctly
  setInterval(renderStatus, 60 * 1000);

  /* ------------------------------------------------------------------
     Review rotation
  ------------------------------------------------------------------ */
  var boardEl = document.getElementById("quoteboard");
  if (boardEl) {
    var quotes = boardEl.querySelectorAll(".quote");
    var dotsWrap = boardEl.querySelector(".quoteboard__dots");
    var current = 0;
    var timer = null;

    function show(i) {
      quotes[current].classList.remove("is-active");
      dotsWrap.children[current].classList.remove("is-active");
      current = i;
      quotes[current].classList.add("is-active");
      dotsWrap.children[current].classList.add("is-active");
    }

    function tick() { show((current + 1) % quotes.length); }

    function restart() {
      clearInterval(timer);
      timer = setInterval(tick, 6000);
    }

    quotes.forEach(function (_, i) {
      var b = document.createElement("button");
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Review " + (i + 1));
      if (i === 0) b.classList.add("is-active");
      b.addEventListener("click", function () { show(i); restart(); });
      dotsWrap.appendChild(b);
    });

    boardEl.addEventListener("mouseenter", function () { clearInterval(timer); });
    boardEl.addEventListener("mouseleave", restart);
    restart();
  }

  /* ------------------------------------------------------------------
     Reveal on scroll
  ------------------------------------------------------------------ */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ------------------------------------------------------------------
     Mobile nav
  ------------------------------------------------------------------ */
  var burger = document.getElementById("navBurger");
  var links = document.getElementById("navLinks");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }
})();
