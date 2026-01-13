=== Foundation Inkfire Login - Enterprise Gold ===
Contributors: Inkfire
Tags: login, branding, security, custom login
Requires at least: 6.0
Tested up to: 6.6
Stable tag: 2.0.9
Requires PHP: 7.4
License: GPLv2 or later

Enterprise-grade login customizer with automatic security, accessibility compliance, and zero maintenance.

== Description ==

Replaces the default WordPress login screen with the Inkfire two‑column layout (contact panel + login card). This plugin is designed for enterprise environments where security, accessibility, and strict branding are paramount. It completely hides the core WordPress login styling to ensure a consistent experience across Login, Register, Lost Password, and other authentication flows.

Key Features:

Enterprise Security: Built-in brute force protection (limiting attempts by IP) and CSRF checks on all forms.

Strict Branding: Enforces Inkfire brand colors (Teal/Pink) and assets, preventing theme bleeds.

Accessibility First: WCAG 2.1 AA compliant color contrast, focus states, and reduced motion support.

Zero Configuration: Works out of the box. No settings page to clutter the admin.

Auto-Updates: Integrated GitHub update checker for seamless delivery from your private or public repository.

== Installation ==

Upload the foundation-inkfire-login-styler folder to the /wp-content/plugins/ directory.

Activate the plugin through the 'Plugins' menu in WordPress.

The login page is automatically styled. No configuration needed.

== Frequently Asked Questions ==

= How do I update the plugin? =
The plugin includes a self-hosted updater. When a new release is available on GitHub, you will see an update notification in your WordPress Dashboard just like a standard plugin.

= How do I change the logo or colors? =
This is a "Gold Master" plugin with hardcoded branding to ensure consistency across all client sites. To change branding, you must modify the assets/ folder and inkfire-login-styler.php in the source code.

== Changelog ==

= 2.0.9 =

New: Added custom icon to the WordPress Plugins list for better recognition.

Fix: Resolved asset loading issues by strictly enforcing local paths for images and CSS.

Fix: Hardcoded brand colors to ensure immunity to theme style overrides.

= 2.0.8 =

Fix: Updated auto-updater logic to support Release Assets (ZIPs), fixing installation issues on nested repository structures.

Update: Removed branch tracking to strictly enforce stable Tag-based updates.

= 2.0.7 =

Update: Bumped version for updater testing.

= 2.0.6 =

Security: Added IP sanitization helper and improved nonce verification on all forms.

UX: Added real-time password strength meter and "Please wait..." loading states on buttons.

Accessibility: Added missing ARIA labels, improved focus indicators for social icons, and ensured WCAG 2.1 AA contrast compliance.

Dev: Added self-healing asset logic to fallback gracefully if files are missing.

=