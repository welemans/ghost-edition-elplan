async function isMember() {
    try {
        const response = await fetch(`${location.origin}/members/api/member/`);
        return response.status === 200; // Returns true if the user is a member
    } catch (error) {
        console.error('Error checking member status:', error);
        return false;
    }
}

async function openPopup() {
    const member = await isMember();

    if (!member) {
        // Create or find the portal trigger link
        let portalLink = document.querySelector('a.gh-portal-trigger');
        if (!portalLink) {
            portalLink = document.createElement('a');
            portalLink.setAttribute('href', '#/portal');
            portalLink.classList.add('gh-portal-trigger');
            portalLink.style.display = 'none'; // Keep it hidden
            document.body.appendChild(portalLink);
        }

        // Trigger the portal popup
        portalLink.click();
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    await openPopup();

    // Continuously check if the popup should be reopened
    setInterval(async function () {
        const member = await isMember();
        if (!member) {
            openPopup();
        }
    }, 100); // Check every 100ms
});