import {
    SectionCard,
    SectionCardBody,
    SectionCardHeader,
    type SectionCardHeaderProps,
} from "@/components/shared/section-card";
import type { ReactNode } from "react";

export interface DetailCardBodyProps {
    /** Spacing of the body. Replaced as a whole when overridden. */
    padding?: string;
    className?: string;
}

export interface DetailCardProps {
    children: ReactNode;
    /** Card surface overrides (dark variant, extra padding, rounded corners…). */
    className?: string;
    /**
     * Icon + title + subtitle (+ badge/chip) header row. Omit it for a card that
     * starts straight with its content.
     */
    header?: SectionCardHeaderProps;
    /**
     * Body wrapper. Defaults to {@link SectionCardBody}'s padding.
     * Pass `false` to render the children directly inside the card, for cards
     * that keep their padding on the card itself (the aside widgets do).
     */
    body?: DetailCardBodyProps | false;
}

/**
 * The card shape shared by every section of `/explore-universities/{university}`
 * and `/explore-universities/{university}/{department}`: a {@link SectionCard}
 * surface, the standard header row and the padded body.
 *
 * It replaces the repeated `SectionCard > SectionCardHeader > SectionCardBody`
 * nesting so a card only states what makes it different.
 */
export function DetailCard({ children, className, header, body = {} }: DetailCardProps) {
    return (
        <SectionCard className={className}>
            {header && <SectionCardHeader {...header} />}

            {body === false ? (
                children
            ) : (
                <SectionCardBody padding={body.padding} className={body.className}>
                    {children}
                </SectionCardBody>
            )}
        </SectionCard>
    );
}
