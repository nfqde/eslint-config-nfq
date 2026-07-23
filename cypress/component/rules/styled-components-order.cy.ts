export {};

/**
 *
 * @param name
 */
const fixture = (name: string) => `cypress/fixtures/rules/styled-components-order/${name}`;

const fixedInvalid = [
    '// @ts-nocheck',
    'const InfoPopup = ({children}: {children: React.ReactNode}) => (',
    '    <Wrapper>',
    '        <Info />',
    '        <Popover>',
    '            <PopoverContent>{children}</PopoverContent>',
    '        </Popover>',
    '    </Wrapper>',
    ');',
    '',
    'const Wrapper = styled.div``;',
    '',
    'const Info = styled.div``;',
    '',
    'const Popover = styled.div``;',
    '',
    'const PopoverContent = styled.div``;',
    ''
].join('\n');

describe('styled-components-order', () => {
    it('accepts render-aligned definitions', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'styled-components-order',
        valid: [
            {
                filename: fixture('valid.tsx'),
                name: 'render aligned'
            },
            {
                filename: fixture('edgecase.tsx'),
                name: 'dependency first'
            }
        ]
    }));

    it('accepts files without jsx usage', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'styled-components-order',
        valid: [
            {
                filename: fixture('no-jsx.tsx'),
                name: 'no jsx usage'
            }
        ]
    }));

    it('accepts chained styled dependencies', () => cy.runRuleTester({
        invalid: [],
        ruleName: 'styled-components-order',
        valid: [
            {
                filename: fixture('valid-chained-deps.tsx'),
                name: 'chained styled deps'
            }
        ]
    }));

    it('reports out-of-order definitions', () => cy.runRuleTester({
        invalid: [
            {
                errors: [
                    {messageId: 'renderOrder'},
                    {messageId: 'renderOrder'}
                ],
                filename: fixture('invalid.tsx'),
                name: 'out of order',
                output: fixedInvalid
            }
        ],
        ruleName: 'styled-components-order',
        valid: []
    }));
});