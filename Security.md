# Security Policy for jason111nn.github.io

## Overview
This is the security policy for the personal website hosted on GitHub Pages at [jason111nn.github.io](https://jason111nn.github.io). The website serves as a personal portfolio and includes various interactive elements such as JavaScript libraries for UI components, animations, and interactive features.

While this website is designed to be secure and user-friendly, it is important to understand the security measures and the responsibilities of both users and the developer.

## Security Measures

### 1. **HTTPS (SSL/TLS Encryption)**
All communication with the website is encrypted using HTTPS, ensuring that any data transmitted between the user and the website is secure and protected from interception.

### 2. **Third-Party Libraries**
The website integrates third-party libraries, such as Bootstrap, jQuery, SweetAlert2, GSAP, and others. These libraries are hosted on reputable Content Delivery Networks (CDNs) and are continuously monitored for security vulnerabilities. However, users should be aware that the security of these external libraries depends on their providers.

- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [GSAP](https://greensock.com/gsap/)
- [Tippy.js](https://atomiks.github.io/tippyjs/)
- [Particles.js](https://vincentgarreau.com/particles.js/)

### 3. **Content Security Policy (CSP)**
A Content Security Policy (CSP) is recommended for websites to prevent Cross-Site Scripting (XSS) attacks and ensure that only trusted content is loaded. GitHub Pages does not support custom CSP headers directly, but you can implement inline CSP with meta tags in your HTML header.

Example:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com; style-src 'self' https://stackpath.bootstrapcdn.com;">
```
### 4. Data Protection
No Sensitive Data Collection: The website does not collect or store any sensitive personal data. Any interaction or form submission on the website (such as contact forms) is handled through third-party services like Google Forms or email.
No Cookies: The website does not use cookies to track user behavior or collect any personal information.
### 5. JavaScript Vulnerabilities
While the website uses various JavaScript libraries to improve user interaction, users should be aware of the potential risks associated with JavaScript vulnerabilities. It's important to always keep your browser updated and avoid interacting with any untrusted content on the site.

### 6. Cross-Site Scripting (XSS)
The website strives to ensure that no user-generated content is allowed to run JavaScript. This minimizes the risk of XSS attacks. Always use trusted third-party libraries and frameworks to handle dynamic content safely.

### 7. Cross-Site Request Forgery (CSRF)
The website does not perform actions like login, password changes, or form submissions that could be exploited through CSRF. If any form submission occurs (such as a contact form), it uses Google Forms or similar services which already handle CSRF protection.

### 8. Vulnerability Disclosure
If you find any security vulnerabilities on the site, please report them to the website owner at jason5j288@gmail.com. The owner will take necessary steps to address the issue and ensure the security of the site.

License & Usage Terms
Creative Commons License
The content on this website is licensed under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0). This means:

Attribution (BY): You must give appropriate credit to the creator (Jason111nn), provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the creator endorses you or your use.
NonCommercial (NC): You may not use the material for commercial purposes.
NoDerivatives (ND): You may not modify, remix, or build upon the material. If you want to use the content, it must remain unchanged.
ShareAlike (SA): If you do use any material under this license, you must share it under the same terms.
For more details on the license, you can visit Creative Commons License.

Conclusion
The security of this website is a priority, and we aim to provide a safe and enjoyable experience for all users. However, users should also take precautions, such as ensuring their web browsers are updated, not sharing sensitive information through insecure channels, and avoiding interacting with untrusted scripts or external links.

For more information or questions about the website's security or licensing, please contact the website owner at jason5j288@google.com.
