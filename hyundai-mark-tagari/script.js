const contact = {
  name: "Mark Angelo L. Tagari",
  title: "Sales Consultant",
  phone: "09277171496",
  email: "marktagari@gmail.com",
  url: "https://www.facebook.com",
  location: "ESJAY AUTOGROUP",
  bio: "🚘 Your Trusted Car Sales Consultant\nHelping you find the perfect car for your lifestyle and budget.\n📩 DM me for inquiries, promos & test drives!\n",
  socials: [
    { name: "Facebook Page", icon: "icons/fb.png", url: "https://www.facebook.com/profile.php?id=61590744893698&mibextid=wwXIfr&rdid=7Mz6YkpElOf46Br8&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CGKsu2mJN%2F%3Fmibextid%3DwwXIfr#" },
    { name: "Personal Account", icon: "icons/fb.png", url: "https://www.facebook.com/Anjeroooo?mibextid=wwXIfr&rdid=pIGQNwzygX35qPXX&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1C1amhpXPw%2F%3Fmibextid%3DwwXIfr#" },
    { name: "TikTok", icon: "icons/tiktok.png", url: "https://www.tiktok.com/@_anjeroo?_r=1&_t=ZS-9AU0gQ3Gpsu&fbclid=IwY2xjawU5My9leHRuA2FlbQIxMABwZG9mBWJyaWQRMUxRcHduSGRPYXlUTFY2S3RzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEeeyUOzr7XbJ-EDUW1EGyaAh6VLaBs-eaBXC8OBrz5kpAowP1nVLhHIPOAlOE_aem_jeDDpn9Frw4qS0W3Kv5m1A" },
    { name: "Instagram", icon: "icons/ig.png", url: "https://www.instagram.com/angelotagari?rpxt=MTVwaHZ6bnNwczhvag%3D%3D&utm_source=qr&fbclid=IwY2xjawU5MCJleHRuA2FlbQIxMABwZG9mBWJyaWQRMUxRcHduSGRPYXlUTFY2S3RzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEeCDre46cdmnS7_QlEDS-UQ_eWfbWisXMBFP_w2uQqCi6bd3tphTh3vKuVz0Q_aem_yj667ycfNqnTpRM2tXGwkQ" },
  ],
};

const toast = document.querySelector("#toast");
let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

document.querySelector("#save-contact").addEventListener("click", () => {
  showToast("Opening contact card. Choose Add to Contacts to save it.");
});

function renderContact() {
  const pageTitle = `${contact.name} — Digital Business Card`;

  document.title = pageTitle;
  document.querySelector("#page-description").content =
    `${contact.name}, ${contact.title}. Contact details and links.`;
  document.querySelector("#avatar").setAttribute("aria-label", contact.name);
  document.querySelector("#profile-photo").alt = `Portrait of ${contact.name}`;
  document.querySelector("#profile-eyebrow").textContent = contact.location;
  document.querySelector("#profile-name").textContent = contact.name;
  document.querySelector("#profile-title").textContent = contact.title;

  const bio = document.querySelector("#profile-bio");
  bio.textContent = contact.bio;
  bio.hidden = !contact.bio.trim();

  const phoneUrl = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;
  const viberNumber = contact.phone.replace(/\D/g, "").replace(/^0/, "63");
  const emailUrl = `mailto:${contact.email}`;
  document.querySelector("#call-action").href = phoneUrl;
  document.querySelector("#message-action").href = `sms:${contact.phone.replace(/[^\d+]/g, "")}`;
  document.querySelector("#viber-action").href = `viber://chat?number=%2B${viberNumber}`;
  document.querySelector("#email-action").href = emailUrl;
  document.querySelector("#location-action").href =
    "https://www.google.com/maps/search/?api=1&query=HYUNDAI%20SANTIAGO%20CITY";
  document.querySelector("#email-detail").href = emailUrl;
  document.querySelector("#email-text").textContent = contact.email;
  document.querySelector("#phone-detail").href = phoneUrl;
  document.querySelector("#phone-text").textContent = contact.phone;
  const socialSection = document.querySelector("#social-section");
  const socialLinks = document.querySelector("#social-links");
  socialLinks.replaceChildren();
  for (const social of contact.socials) {
    const link = document.createElement("a");
    link.href = social.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.setAttribute("aria-label", social.name);
    let icon;
    if (/\.(svg|png|jpe?g|webp|gif)$/i.test(social.icon)) {
      icon = document.createElement("img");
      icon.className = "social-image";
      icon.src = social.icon;
      icon.alt = "";
    } else {
      icon = document.createElement("span");
      icon.className = "social-mark";
      icon.textContent = social.icon;
    }
    icon.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    label.textContent = social.name;
    link.append(icon, label);
    socialLinks.append(link);
  }
  socialSection.hidden = contact.socials.length === 0;
}

document.querySelector("#share-button").addEventListener("click", async () => {
  const shareData = {
    title: `${contact.name} — Digital Business Card`,
    text: `Connect with ${contact.name}, ${contact.title}.`,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(shareData.url);
    showToast("Card link copied to clipboard.");
  } catch (error) {
    if (error.name === "AbortError") return;

    showToast("Unable to share this card. Please copy the page link.");
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
renderContact();

const releasedToggle = document.querySelector("#released-toggle");
const releasedUnits = document.querySelector("#released-units");
const releasedAction = document.querySelector("#released-action");
const releasedSection = document.querySelector("#released-section");
const releasedTrack = document.querySelector("#released-track");

releasedToggle.setAttribute("aria-expanded", "false");
releasedUnits.hidden = true;

const coffeeToggle = document.querySelector("#coffee-toggle");
const coffeeDetails = document.querySelector("#coffee-details");
coffeeToggle.addEventListener("click", () => {
  const isExpanded = coffeeToggle.getAttribute("aria-expanded") === "true";
  coffeeToggle.setAttribute("aria-expanded", String(!isExpanded));
  coffeeDetails.hidden = isExpanded;
});

releasedToggle.addEventListener("click", () => {
  const isExpanded = releasedToggle.getAttribute("aria-expanded") === "true";
  releasedToggle.setAttribute("aria-expanded", String(!isExpanded));
  releasedUnits.hidden = isExpanded;
});

releasedAction.addEventListener("click", (event) => {
  event.preventDefault();
  releasedToggle.setAttribute("aria-expanded", "true");
  releasedUnits.hidden = false;
  releasedSection.scrollIntoView({ behavior: "smooth", block: "start" });
});
