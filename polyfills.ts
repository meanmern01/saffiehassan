export function initPolyfills() {
    if (!window?.CSS?.supports?.('selector(:focus-visible)')) {
        import(/* webpackChunkName: "focus-visible" */ 'focus-visible');
    }
}
