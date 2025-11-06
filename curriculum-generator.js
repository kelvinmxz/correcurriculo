// Curriculum Generator JavaScript
// Usando jsPDF para geração de PDFs no frontend

// Dados do currículo exemplo (Kelvin)
const exampleData = {
    fullName: "Kelvin Costa Maues",
    jobTitle: "Desenvolvedor de Software & Técnico em Informática",
    phone: "(92) 9 85116243",
    email: "kelvincosta4545@gmail.com",
    address: "Travessa Aimoré, 18, Manaus",
    website: "https://kelvinmxzportifolio.vercel.app/",
    summary: "Sou Técnico em Informática com sólida formação e ampla experiência em Desenvolvimento de software. Atualmente, estou cursando Ciência da Computação, o que tem ampliado ainda mais minha visão sobre tecnologia e inovação. Tenho profundo conhecimento em linguagens de programação, metodologias ágeis e boas práticas de desenvolvimento, aliado a uma abordagem criativa e eficiente para resolução de problemas e otimização de processos.\n\nSou apaixonado pela área de tecnologia e estou sempre em busca de novos desafios. Tenho grande interesse nas áreas de dados e visão computacional, onde vejo oportunidades empolgantes para aplicar inteligência artificial e análise de informações de forma estratégica.",
    skills: ["HTML & CSS", "Java", "Python", "C++", "MySQL", "Banco de Dados", "Back-end", "Front-end", "Análise de Sistemas", "Suporte Técnico", "Git", "Metodologias Ágeis"],
    experience: [
        {
            jobPosition: "Estagiário de Desenvolvedor",
            company: "Visteon Corporation - Manaus, AM",
            startDate: "Abril 2025",
            endDate: "atual",
            jobDescription: "Estagiário de Desenvolvimento – Visteon Corporation. Atuação no desenvolvimento de sistemas e apoio a projetos, contribuindo para a otimização de processos e inovação em soluções tecnológicas. Essa experiência tem fortalecido minhas habilidades técnicas, minha visão de trabalho em equipe e meu desenvolvimento profissional em um ambiente corporativo.\n\n• Utilização de ferramentas de controle de versão, como Git, gerenciando o código-fonte\n• Criação de scripts de automação para otimizar processos repetitivos, economizando tempo e recursos da equipe\n• Manutenção e melhoria contínua de sistemas existentes, identificando e corrigindo bugs e implementando novas funcionalidades"
        },
        {
            jobPosition: "Desenvolvedor",
            company: "NaviView - Manaus, AM",
            startDate: "Junho 2023",
            endDate: "Dezembro 2024",
            jobDescription: "Visão geral do projeto: O NaviView é um sistema que auxilia pessoas deficientes visuais em sua geolocalização e deslocamento por meio da tecnologia, visando à garantia de segurança e independência em sua locomoção, além da diminuição dos impactos causados pela falta de acessibilidade.\n\n• Implementação de testes automatizados, garantindo a robustez e a confiabilidade do código em todas as etapas do desenvolvimento\n• Acompanhamento de tendências e avanços tecnológicos, garantindo a aplicação das melhores práticas no desenvolvimento de software"
        }
    ],
    education: [
        {
            course: "Ciências da Computação",
            institution: "Universidade Paulista - Manaus",
            eduStartDate: "Janeiro 2025",
            eduEndDate: "Janeiro 2029",
            description: "Iniciei o Curso de Ciências da Computação na Universidade Paulista, buscando expandir meus conhecimentos e habilidades nas áreas de tecnologia e inovação. Com foco em desenvolver soluções criativas e eficientes, espero contribuir ativamente para o avanço do setor e aprimorar minhas competências técnicas ao longo da graduação."
        },
        {
            course: "Técnico em Informática",
            institution: "Fundação Matias Machline - Manaus",
            eduStartDate: "Janeiro 2022",
            eduEndDate: "Dezembro 2024",
            description: "O curso ofereceu uma abordagem prática e teórica, proporcionando a capacidade de enfrentar desafios tecnológicos e colaborar efetivamente em projetos de equipe com uma formação abrangente e sólida."
        }
    ]
};

// Funções para mostrar/ocultar formulário
function showForm() {
    document.getElementById('example-curriculum').style.display = 'none';
    document.getElementById('form-container').style.display = 'block';
    document.querySelector('.cta-section').style.display = 'none';
    
    // Scroll para o formulário
    document.getElementById('form-container').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function hideForm() {
    document.getElementById('example-curriculum').style.display = 'block';
    document.getElementById('form-container').style.display = 'none';
    document.querySelector('.cta-section').style.display = 'block';
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Funções para adicionar campos dinâmicos
function addSkill() {
    const container = document.getElementById('skills-container');
    const skillDiv = document.createElement('div');
    skillDiv.className = 'dynamic-field';
    skillDiv.innerHTML = `
        <input type="text" class="form-control" name="skill" placeholder="Ex: JavaScript, Python, React...">
        <button type="button" class="remove-btn" onclick="removeField(this)">×</button>
    `;
    container.appendChild(skillDiv);
}

function addExperience() {
    const container = document.getElementById('experience-container');
    const expDiv = document.createElement('div');
    expDiv.className = 'dynamic-field';
    expDiv.innerHTML = `
        <button type="button" class="remove-btn" onclick="removeField(this)">×</button>
        <div class="row">
            <div class="col-md-6">
                <label class="form-label">Cargo</label>
                <input type="text" class="form-control" name="jobPosition">
            </div>
            <div class="col-md-6">
                <label class="form-label">Empresa</label>
                <input type="text" class="form-control" name="company">
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-6">
                <label class="form-label">Data Início</label>
                <input type="text" class="form-control" name="startDate" placeholder="Ex: Janeiro 2023">
            </div>
            <div class="col-md-6">
                <label class="form-label">Data Fim</label>
                <input type="text" class="form-control" name="endDate" placeholder="Ex: Atual">
            </div>
        </div>
        <div class="mt-2">
            <label class="form-label">Descrição</label>
            <textarea class="form-control" name="jobDescription" rows="3" placeholder="Descreva suas responsabilidades e conquistas..."></textarea>
        </div>
    `;
    container.appendChild(expDiv);
}

function addEducation() {
    const container = document.getElementById('education-container');
    const eduDiv = document.createElement('div');
    eduDiv.className = 'dynamic-field';
    eduDiv.innerHTML = `
        <button type="button" class="remove-btn" onclick="removeField(this)">×</button>
        <div class="row">
            <div class="col-md-6">
                <label class="form-label">Curso</label>
                <input type="text" class="form-control" name="course">
            </div>
            <div class="col-md-6">
                <label class="form-label">Instituição</label>
                <input type="text" class="form-control" name="institution">
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-6">
                <label class="form-label">Data Início</label>
                <input type="text" class="form-control" name="eduStartDate">
            </div>
            <div class="col-md-6">
                <label class="form-label">Data Fim</label>
                <input type="text" class="form-control" name="eduEndDate">
            </div>
        </div>
    `;
    container.appendChild(eduDiv);
}

function removeField(button) {
    button.parentElement.remove();
}

// Função para coletar dados do formulário
function collectFormData() {
    const data = {
        fullName: document.getElementById('fullName').value,
        jobTitle: document.getElementById('jobTitle').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        website: document.getElementById('website').value,
        summary: document.getElementById('summary').value,
        skills: [],
        experience: [],
        education: []
    };

    // Coletar habilidades
    const skillInputs = document.querySelectorAll('input[name="skill"]');
    skillInputs.forEach(input => {
        if (input.value.trim()) {
            data.skills.push(input.value.trim());
        }
    });

    // Coletar experiências
    const expContainers = document.querySelectorAll('#experience-container .dynamic-field');
    expContainers.forEach(container => {
        const exp = {
            jobPosition: container.querySelector('input[name="jobPosition"]').value,
            company: container.querySelector('input[name="company"]').value,
            startDate: container.querySelector('input[name="startDate"]').value,
            endDate: container.querySelector('input[name="endDate"]').value,
            jobDescription: container.querySelector('textarea[name="jobDescription"]').value
        };
        if (exp.jobPosition || exp.company) {
            data.experience.push(exp);
        }
    });

    // Coletar formação
    const eduContainers = document.querySelectorAll('#education-container .dynamic-field');
    eduContainers.forEach(container => {
        const edu = {
            course: container.querySelector('input[name="course"]').value,
            institution: container.querySelector('input[name="institution"]').value,
            eduStartDate: container.querySelector('input[name="eduStartDate"]').value,
            eduEndDate: container.querySelector('input[name="eduEndDate"]').value
        };
        if (edu.course || edu.institution) {
            data.education.push(edu);
        }
    });

    return data;
}

// Função para gerar PDF do currículo exemplo (Kelvin)
function generatePDF() {
    generatePDFFromData(exampleData);
}

// Função para gerar PDF do currículo personalizado
function generateCustomPDF() {
    const data = collectFormData();
    
    // Validação básica
    if (!data.fullName || !data.email) {
        alert('Por favor, preencha pelo menos o Nome Completo e Email.');
        return;
    }

    generatePDFFromData(data);
}

// Função principal para gerar PDF
function generatePDFFromData(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Configurações
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = 20;

    // Cores
    const primaryColor = [30, 60, 114]; // Azul escuro
    const secondaryColor = [74, 144, 226]; // Azul claro
    const textColor = [0, 0, 0]; // Preto

    // Header com fundo azul
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, 60, 'F');

    // Nome principal
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    const nameWidth = doc.getTextWidth(data.fullName);
    doc.text(data.fullName, (pageWidth - nameWidth) / 2, 25);

    // Título profissional
    if (data.jobTitle) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        const titleWidth = doc.getTextWidth(data.jobTitle);
        doc.text(data.jobTitle, (pageWidth - titleWidth) / 2, 35);
    }

    // Informações de contato
    doc.setFontSize(10);
    let contactInfo = [];
    if (data.address) contactInfo.push(data.address);
    if (data.phone) contactInfo.push(data.phone);
    if (data.email) contactInfo.push(data.email);
    if (data.website) contactInfo.push(data.website);

    const contactText = contactInfo.join(' | ');
    const contactWidth = doc.getTextWidth(contactText);
    doc.text(contactText, (pageWidth - contactWidth) / 2, 50);

    // Reset para conteúdo principal
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    yPosition = 80;

    // Função auxiliar para adicionar seção
    function addSection(title, content, yPos) {
        // Título da seção
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(title, margin, yPos);
        
        // Linha decorativa
        doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        doc.setLineWidth(1);
        doc.line(margin, yPos + 2, margin + 60, yPos + 2);
        
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        return yPos + 10;
    }

    // Função auxiliar para texto multilinha
    function addMultilineText(text, yPos, fontSize = 10, fontStyle = 'normal') {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', fontStyle);
        const lines = doc.splitTextToSize(text, contentWidth);
        doc.text(lines, margin, yPos);
        return yPos + (lines.length * (fontSize * 0.4)) + 5;
    }

    // Resumo Profissional
    if (data.summary) {
        yPosition = addSection('RESUMO PROFISSIONAL', '', yPosition);
        yPosition = addMultilineText(data.summary, yPosition);
        yPosition += 5;
    }

    // Verificar se precisa de nova página
    if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
    }

    // Habilidades
    if (data.skills && data.skills.length > 0) {
        yPosition = addSection('HABILIDADES E COMPETÊNCIAS', '', yPosition);
        
        // Exibir habilidades como tags
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        
        let xPos = margin;
        let currentLineY = yPosition;
        
        data.skills.forEach(skill => {
            const skillWidth = doc.getTextWidth(skill) + 8;
            
            // Se não cabe na linha, pula para próxima
            if (xPos + skillWidth > pageWidth - margin) {
                xPos = margin;
                currentLineY += 10;
            }
            
            // Desenhar background da skill
            doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
            doc.roundedRect(xPos, currentLineY - 4, skillWidth, 6, 2, 2, 'F');
            
            // Texto da skill
            doc.setTextColor(255, 255, 255);
            doc.text(skill, xPos + 4, currentLineY);
            
            xPos += skillWidth + 5;
        });
        
        yPosition = currentLineY + 15;
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    }

    // Verificar se precisa de nova página
    if (yPosition > 220) {
        doc.addPage();
        yPosition = 20;
    }

    // Experiência Profissional
    if (data.experience && data.experience.length > 0) {
        yPosition = addSection('EXPERIÊNCIA PROFISSIONAL', '', yPosition);
        
        data.experience.forEach(exp => {
            // Verificar se precisa de nova página
            if (yPosition > 220) {
                doc.addPage();
                yPosition = 20;
            }
            
            // Cargo
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text(exp.jobPosition, margin, yPosition);
            yPosition += 6;
            
            // Empresa e período
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            const companyDate = `${exp.company} | ${exp.startDate} - ${exp.endDate}`;
            doc.text(companyDate, margin, yPosition);
            yPosition += 8;
            
            // Descrição
            if (exp.jobDescription) {
                doc.setTextColor(textColor[0], textColor[1], textColor[2]);
                yPosition = addMultilineText(exp.jobDescription, yPosition);
            }
            
            yPosition += 5;
        });
    }

    // Verificar se precisa de nova página
    if (yPosition > 220) {
        doc.addPage();
        yPosition = 20;
    }

    // Formação Acadêmica
    if (data.education && data.education.length > 0) {
        yPosition = addSection('FORMAÇÃO ACADÊMICA', '', yPosition);
        
        data.education.forEach(edu => {
            // Verificar se precisa de nova página
            if (yPosition > 240) {
                doc.addPage();
                yPosition = 20;
            }
            
            // Curso
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            doc.text(edu.course, margin, yPosition);
            yPosition += 6;
            
            // Instituição e período
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            const institutionDate = `${edu.institution} | ${edu.eduStartDate} - ${edu.eduEndDate}`;
            doc.text(institutionDate, margin, yPosition);
            yPosition += 8;
            
            // Descrição (se houver)
            if (edu.description) {
                doc.setTextColor(textColor[0], textColor[1], textColor[2]);
                yPosition = addMultilineText(edu.description, yPosition);
            }
            
            yPosition += 5;
        });
    }

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Página ${i} de ${pageCount}`, pageWidth - margin - 20, doc.internal.pageSize.height - 10);
    }

    // Gerar nome do arquivo
    const fileName = `Curriculo_${data.fullName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Download do PDF
    doc.save(fileName);

    // Feedback para o usuário
    const message = data === exampleData ? 
        'PDF do currículo de exemplo baixado com sucesso!' : 
        'Seu currículo personalizado foi gerado com sucesso!';
    
    alert(message);
}

// Inicialização quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Curriculum Generator carregado com sucesso!');
    
    // Adicionar eventos para os botões de adicionar campos
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
});

// Função para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para validar formulário
function validateForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!fullName) {
        alert('Por favor, preencha seu nome completo.');
        return false;
    }
    
    if (!email) {
        alert('Por favor, preencha seu email.');
        return false;
    }
    
    if (!validateEmail(email)) {
        alert('Por favor, insira um email válido.');
        return false;
    }
    
    return true;
}