describe('Pizza Ordering App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    })
    it('sanity check', () => {
        expect(2 + 2).to.equal(4);
    })
    it('text input', () => {
        nameInput()
            .type('Fernando Martinez')
        specialInstructionsInput()
            .type('Leave at the door, please.')
    })
    it('submit', () => {
        nameInput()
            .type('John Doe')
            .should('have.value', 'John Doe')
        submitBtn().click();
    })
    it('multiple toppings', () => {
        nameInput()
            .type('Jane Doe')
        cheese().click()
        mushroom().click()
        gp().click()
        onion().click()
        pineapple().click()
    })
})

const nameInput = () => cy.get('input[name=name]');
const specialInstructionsInput = () => cy.get('textarea[name=instructions]');
const submitBtn = () => cy.get('button[name=orderBtn]');
const pepperoni = () => cy.get('input[name=pepperoni]');
const cheese = () => cy.get('input[name=cheese]');
const mushroom = () => cy.get('input[name=mushroom]');
const sausage = () => cy.get('input[name=sausage]');
const gp = () => cy.get('input[name=gp]');
const onion = () => cy.get('input[name=onion]');
const pineapple = () => cy.get('input[name=pineapple]');
const bo = () => cy.get('input[name=bo]');