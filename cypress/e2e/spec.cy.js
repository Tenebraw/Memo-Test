const URL=' http://127.0.0.1:5500/index.html'
const numeroCuadros=24;

  describe('Comprobacion General', () => {
    beforeEach(() => {
      cy.visit(URL)
    })

    it('Asegurar que haya un tablero con 24 cuadros',()=>{
    cy.get('.cartascontenedor').find('.memocartas').should('have.length',numeroCuadros);
  })

  it('Comprobar mensaje div fin del juego este oculto',()=>{
    cy.get('#fin-juego').should('not.be.visible');
  })

  it('Chequear funcionamiento boton Empezar de Nuevo',()=>{
    cy.get('#botonEmpezar').click();
  })
});

  describe('Comprobacion funcionamento',()=>{
    beforeEach(()=>{
      cy.visit(URL);
    })

    it('Asegurarse que las cartas sean aleatorias',()=>{
      let arrayImages=[];
      cy.get('.frente').then(cartas=>{
        cartas.each(function(i,carta){
          arrayImages.push(carta.src);
        });
  
        cy.visit(URL);
  
        let arrayImagesNuevas=[];
        cy.get('.frente').then(cartas=>{
          cartas.each(function(i,carta){
            arrayImagesNuevas.push(carta.src);
          });
          cy.wrap(arrayImages).should('not.deep.equal',arrayImagesNuevas);
  
        });
      });
    })

    it('Al hacer click las cartas deben girar',()=>{
      cy.get('.memocartas').each((carta) => {
        cy.wrap(carta).click();
        cy.wrap(carta).should('have.class','girar');
      }) 
    })
  })


  describe('Resolviendo Juego',()=>{
    beforeEach(()=>{
      cy.visit(URL);
    })

    it('Solucion juego',()=>{  
      cy.get('[src="images/front1.jpg"]')
      .parent('div').click({ multiple: true })
      cy.get('[src="images/front2.jpg"]')
      .parent('div').click({ multiple: true })
      cy.get('[src="images/front3.jpg"]')
      .parent('div').click({ multiple: true })
      cy.get('[src="images/front4.jpg"]')
      .parent('div').click({ multiple: true })
      cy.get('[src="images/front5.jpg"]')
      .parent('div').click({ multiple: true })
      cy.get('[src="images/front6.jpg"]')
      .parent('div').click({ multiple: true })
      cy.get('[src="images/front7.jpg"]')
      .parent('div').click({ multiple: true })
      cy.get('[src="images/front8.jpg"]')
      .parent('div').click({ multiple: true })
      cy.get('[src="images/front9.jpg"]')
      .parent('div').click({ multiple: true })
      cy.get('[src="images/front10.jpg"]')
      .parent('div').click({ multiple: true })
      cy.get('[src="images/front11.jpg"]')
      .parent('div').click({ multiple: true })
      cy.get('[src="images/front12.jpg"]')
      .parent('div').click({ multiple: true })

      const turnos =12;
      cy.get('#fin-juego').should('be.visible').contains(`Fin del juego! Tardaste ${turnos} turnos en terminar.`);
    })
  })


  