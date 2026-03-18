/**
 * Footer
 *
 * 說明：
 * - 前台共用頁尾（Phase 1 簡易版）
 */

function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-text-muted sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p>© {new Date().getFullYear()} CyberNeon. All rights reserved.</p>

          <div className="flex gap-4">
            <span className="hover:text-text-main cursor-pointer">
              關於我們
            </span>
            <span className="hover:text-text-main cursor-pointer">
              聯絡我們
            </span>
            <span className="hover:text-text-main cursor-pointer">
              隱私權政策
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
