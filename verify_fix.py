import asyncio
from playwright.async_api import async_playwright
import os

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Test projects.html
        path = os.path.abspath("uai-website/projects.html")
        await page.goto(f"file://{path}")
        await page.wait_for_timeout(2000) # Wait for animation

        # Check if project card is visible
        is_visible = await page.is_visible(".project-card")
        opacity = await page.evaluate('getComputedStyle(document.querySelector(".project-card")).opacity')

        print(f"Projects Card Visible: {is_visible}")
        print(f"Projects Card Opacity: {opacity}")

        await page.screenshot(path="verification/uai_fix_projects.png")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
