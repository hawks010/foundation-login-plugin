// Inkfire Login Enterprise Gold - Zero Maintenance JS
(function() {
    'use strict';
    
    const IFLS = {
        init() {
            this.enhanceForms();
            this.assetErrorHandling();
            this.autoFocus();
            this.passwordStrength();
            this.responsiveChecks();
            
            // Self-healing: Check if CSS loaded
            setTimeout(() => this.checkCSS(), 1000);
        },
        
        fallback() {
            document.body.classList.remove("inkfire-login");
            document.querySelector(".if-full-bg")?.remove();
            console.warn("IFLS: Falling back to default WordPress login");
        },
        
        enhanceForms() {
            // Add modern input styling and focus handling
            document.querySelectorAll('input.input').forEach(input => {
                input.addEventListener('focus', (e) => e.target.parentElement.classList.add('if-input-focused'));
                input.addEventListener('blur', (e) => {
                    if (!e.target.value) e.target.parentElement.classList.remove('if-input-focused');
                });
            });

            // Add real-time validation feedback
            document.querySelectorAll('input[required]').forEach(input => {
                input.addEventListener('invalid', (e) => {
                    e.target.setAttribute('aria-invalid', 'true');
                    e.target.parentElement.classList.add('if-input-invalid');
                });
                input.addEventListener('input', (e) => {
                    if (e.target.validity.valid) {
                        e.target.removeAttribute('aria-invalid');
                        e.target.parentElement.classList.remove('if-input-invalid');
                    }
                });
            });
            
            // Form submission enhancements
            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', (e) => {
                    const submitBtn = form.querySelector('input[type="submit"], button[type="submit"]');
                    if (submitBtn) {
                        const originalText = submitBtn.value;
                        submitBtn.value = 'Please wait...';
                        submitBtn.disabled = true;
                        setTimeout(() => {
                            submitBtn.value = originalText;
                            submitBtn.disabled = false;
                        }, 30000);
                    }
                });
            });
        },
        
        assetErrorHandling() {
            document.addEventListener('error', (e) => {
                if (e.target.tagName === 'IMG' && e.target.src.includes('inkfire')) {
                    this.reportAssetError(e.target.src, 'Failed to load');
                    
                    if (e.target.src.includes('cdn.inkfire.co.uk')) {
                        const pluginUrl = window.ifls_vars?.plugin_url || '';
                        const localSrc = e.target.src.replace(
                            'https://cdn.inkfire.co.uk/login/v2/',
                            pluginUrl + 'assets/'
                        );
                        e.target.src = localSrc;
                    }
                }
            }, true);
        },
        
        reportAssetError(asset, error) {
            if (typeof ifls_vars !== 'undefined' && ifls_vars?.ajax_url) {
                fetch(ifls_vars.ajax_url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `action=ifls_asset_error&nonce=${ifls_vars.nonce}&asset=${encodeURIComponent(asset)}&error=${encodeURIComponent(error)}`
                }).catch(() => { /* Silent fail */ });
            }
        },
        
        autoFocus() {
            const firstInput = document.querySelector('input[type="text"], input[type="email"]');
            if (firstInput && this.isElementInViewport(firstInput)) {
                setTimeout(() => firstInput.focus(), 300);
            }
        },
        
        passwordStrength() {
            const pass1 = document.getElementById('if_pass1');
            if (pass1 && pass1.dataset.strengthMeter === 'true') {
                this.initializeStrengthMeter(pass1);
            }
        },
        
        initializeStrengthMeter(input) {
            const wrapper = input.closest('.if-password-strength-wrapper');
            if (!wrapper) return;
            const meter = document.createElement('div');
            meter.className = 'if-password-strength-meter';
            meter.innerHTML = `<div class="strength-bar"></div><div class="strength-text"></div>`;
            wrapper.appendChild(meter);
            input.addEventListener('input', (e) => {
                const strength = this.calculatePasswordStrength(e.target.value);
                this.updateStrengthMeter(meter, strength);
            });
        },
        
        calculatePasswordStrength(password) {
            let score = 0;
            if (!password) return 0;
            if (password.length > 7) score += 1;
            if (password.length > 11) score += 1;
            if (/[a-z]/.test(password)) score += 1;
            if (/[A-Z]/.test(password)) score += 1;
            if (/[0-9]/.test(password)) score += 1;
            if (/[^a-zA-Z0-9]/.test(password)) score += 1;
            return Math.min(score, 5);
        },
        
        updateStrengthMeter(meter, strength) {
            const bar = meter.querySelector('.strength-bar');
            const text = meter.querySelector('.strength-text');
            const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
            const colors = ['#e00', '#e70', '#ea0', '#8c0', '#0a0'];
            bar.style.width = `${(strength / 5) * 100}%`;
            bar.style.backgroundColor = colors[strength - 1] || '#ccc';
            text.textContent = levels[strength - 1] || '';
        },
        
        responsiveChecks() {
            const checkViewport = () => {
                if (window.innerWidth < 400) document.body.classList.add('if-mobile-tiny');
                else document.body.classList.remove('if-mobile-tiny');
                if (window.innerWidth < window.innerHeight && window.innerWidth < 540) document.body.classList.add('if-foldable');
            };
            checkViewport();
            window.addEventListener('resize', checkViewport);
            window.addEventListener('orientationchange', checkViewport);
        },
        
        checkCSS() {
            const testEl = document.querySelector('.if-card');
            if (testEl) {
                const styles = window.getComputedStyle(testEl);
                if (styles.display === 'inline' || styles.backgroundColor === 'rgba(0, 0, 0, 0)') {
                    console.warn('IFLS: CSS may not have loaded, injecting fallback');
                    this.injectFallbackCSS();
                }
            }
        },
        
        injectFallbackCSS() {
            const fallback = `
            .if-shell { display: flex; min-height: 100vh; }
            .if-card { background: white; padding: 2rem; border-radius: 10px; }
            input.input { width: 100%; padding: 10px; margin-bottom: 15px; }
            .button-primary { background: #32797e; color: white; border: none; padding: 10px 20px; }
            `;
            const style = document.createElement('style');
            style.textContent = fallback;
            document.head.appendChild(style);
        },
        
        isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 && rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => IFLS.init());
    } else {
        IFLS.init();
    }
    
    window.IFLS_fallback = IFLS.fallback;
})();