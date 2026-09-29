# Interaction Design

The guided overview, white surfaces, near black text, electric blue accents, large portrait, and original organization artwork remain the visual foundation. Motion should make the work easier to explore while preserving legibility.

## Interaction Hierarchy

| Surface | Feedback |
| --- | --- |
| Software cards | Mouse position controls perspective tilt and elevation |
| Research, experience, education, and skills cards with links | The same behavior with lower rotation and elevation, capped further for large reading panels |
| Affiliation tiles and contact links | Smaller tilt, a neutral shadow, a border highlight, and a pressed state |
| Buttons and text links | Brief elevation or arrow movement; clear focus and pressed states |
| Navigation | Color, underline, or background feedback appropriate to the control |

The large research card remains an article. Its explicit link opens the lab website; selecting its text does not navigate. Cards with multiple destinations retain separate links. Containers do not receive extra tab stops or button roles.

Card surfaces keep their original color. Pointer-following color glows are deliberately absent.

## Motion and Accessibility

CardInteractions enhances server-rendered content without changing its semantics. A single delegated listener batches pointer input through requestAnimationFrame. It reads bounds once on entry and applies depth using a transform. No render loop runs when the pointer stops. Pointer exit, scrolling, selection, window blur, navigation, and preference changes clear the effect.

Tracking is enabled only for a mouse with fine-pointer hover and no reduced motion preference. Keyboard users receive a static focus highlight. Touch users keep normal scrolling and tapping. Reduced motion disables both tilt and transition effects. Content and links work without JavaScript.

## References

These references informed the interaction direction; no third-party component code or design assets were imported.

* [21st interactive card examples](https://21st.dev/%40rahil1202/components/metallic-business-card): perspective that follows the pointer.
* [getdesign.md](https://getdesign.md/): a consistent visual language across components and pages.
* [Apple motion guidance](https://developer.apple.com/design/human-interface-guidelines/motion): brief, purposeful feedback scaled to the input method and accessibility preferences.
* [Google web.dev animation guidance](https://web.dev/articles/animations-guide): prefer transform and opacity, limit work to the active surface, and avoid continuous layout measurement.
