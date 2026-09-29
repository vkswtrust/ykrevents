<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use the index route for the continuous-scroll YKR site and a separate inquiry route; this keeps the browsing experience natural while giving inquiries a focused page.
- Store inquiries in Lovable Cloud with public insert-only access and no public reads; visitors can submit without exposing contact details.
- Serve user-supplied logo and Goa photos through asset pointers; this preserves authentic imagery without committing large binaries.
