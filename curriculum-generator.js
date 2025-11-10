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
    ],
    languages: [
        {
            language: "Português",
            level: "Nativo"
        },
        {
            language: "Inglês",
            level: "Intermediário"
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
        <div class="mt-2">
            <label class="form-label">Descrição (Opcional)</label>
            <textarea class="form-control" name="eduDescription" rows="2" placeholder="Descreva o curso, especialização ou conquistas acadêmicas relevantes..."></textarea>
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
        education: [],
        languages: []
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
            eduEndDate: container.querySelector('input[name="eduEndDate"]').value,
            description: container.querySelector('textarea[name="eduDescription"]')?.value || ''
        };
        if (edu.course || edu.institution) {
            data.education.push(edu);
        }
    });

    // Coletar idiomas
    const langContainers = document.querySelectorAll('#languages-container .dynamic-field');
    console.log('Containers de idiomas encontrados:', langContainers.length);
    
    langContainers.forEach(container => {
        const langInput = container.querySelector('input[name="language"]');
        const levelSelect = container.querySelector('select[name="languageLevel"]');
        
        if (langInput && levelSelect) {
            const lang = {
                language: langInput.value,
                level: levelSelect.value
            };
            console.log('Idioma coletado:', lang);
            if (lang.language) {
                data.languages.push(lang);
            }
        }
    });
    
    console.log('Total de idiomas coletados:', data.languages.length);
    console.log('Dados completos:', data);

    return data;
}

// Função para gerar PDF do currículo exemplo (Kelvin)
function generatePDF() {
    const defaultCustomization = {
        colorScheme: 'blue',
        layoutFormat: 'classic',
        fontSize: 'medium',
        headerStyle: 'gradient',
        showIcons: false,
        roundedCorners: true
    };
    generatePDFFromData(exampleData, defaultCustomization);
}

// Função para gerar PDF do currículo personalizado
function generateCustomPDF() {
    const data = collectFormData();
    
    // Validação básica
    if (!data.fullName || !data.email) {
        alert('Por favor, preencha pelo menos o Nome Completo e Email.');
        return;
    }

    // Coletar configurações de personalização
    const customization = collectCustomizationSettings();
    generatePDFFromData(data, customization);
}

// Função para coletar configurações de personalização
function collectCustomizationSettings() {
    const selectedTemplate = document.getElementById('selectedTemplate')?.value || 'classic';
    const fontSize = document.getElementById('fontSize')?.value || 'medium';
    const colorVariation = document.getElementById('colorVariation')?.value || 'default';
    
    // Debug: verificar se está coletando o template corretamente
    console.log('Template selecionado:', selectedTemplate);
    console.log('Tamanho da fonte:', fontSize);
    console.log('Variação de cor:', colorVariation);
    
    // Mapear template para configurações
    const templateConfigs = {
        classic: {
            layout: 'single-column',
            colorScheme: colorVariation === 'default' ? 'blue' : colorVariation,
            headerStyle: 'gradient',
            showIcons: false
        },
        modern: {
            layout: 'two-column',
            colorScheme: colorVariation === 'default' ? 'green' : colorVariation,
            headerStyle: 'gradient',
            showIcons: false
        },
        creative: {
            layout: 'sidebar',
            colorScheme: colorVariation === 'default' ? 'orange' : colorVariation,
            headerStyle: 'creative',
            showIcons: false
        },
        minimal: {
            layout: 'minimal',
            colorScheme: colorVariation === 'default' ? 'dark' : colorVariation,
            headerStyle: 'minimal',
            showIcons: false
        },
        executive: {
            layout: 'executive',
            colorScheme: colorVariation === 'default' ? 'blue' : colorVariation,
            headerStyle: 'executive',
            showIcons: false
        },
        tech: {
            layout: 'tech',
            colorScheme: colorVariation === 'default' ? 'purple' : colorVariation,
            headerStyle: 'tech',
            showIcons: false
        },
        academic: {
            layout: 'academic',
            colorScheme: colorVariation === 'default' ? 'blue' : colorVariation,
            headerStyle: 'academic',
            showIcons: false
        },
        sales: {
            layout: 'sales',
            colorScheme: colorVariation === 'default' ? 'orange' : colorVariation,
            headerStyle: 'sales',
            showIcons: false
        }
    };
    
    const config = templateConfigs[selectedTemplate] || templateConfigs.classic;
    
    const finalConfig = {
        template: selectedTemplate,
        fontSize,
        colorVariation,
        ...config,
        roundedCorners: true
    };
    
    console.log('Configuração final:', finalConfig);
    
    return finalConfig;
}

// Função principal para gerar PDF
function generatePDFFromData(data, customization = {}) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Configurações padrão
    const config = {
        template: 'classic',
        colorScheme: 'blue',
        layout: 'single-column',
        fontSize: 'medium',
        headerStyle: 'gradient',
        showIcons: false,
        roundedCorners: true,
        ...customization
    };

    // Debug: verificar configurações finais
    console.log('Gerando PDF com configurações:', config);
    console.log('Template aplicado:', config.template);

    // Configurações
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = 20;

    // Esquemas de cores
    const colorSchemes = {
        blue: { primary: [30, 60, 114], secondary: [74, 144, 226] },
        green: { primary: [45, 80, 22], secondary: [107, 144, 128] },
        purple: { primary: [76, 29, 149], secondary: [168, 85, 247] },
        red: { primary: [153, 27, 27], secondary: [239, 68, 68] },
        teal: { primary: [19, 78, 74], secondary: [20, 184, 166] },
        orange: { primary: [234, 88, 12], secondary: [251, 146, 60] },
        dark: { primary: [31, 41, 55], secondary: [107, 114, 128] }
    };
    
    const colors = colorSchemes[config.colorScheme];
    const primaryColor = colors.primary;
    const secondaryColor = colors.secondary;
    const textColor = [0, 0, 0];

    // Tamanhos de fonte baseados na configuração
    const fontSizes = {
        small: { title: 20, subtitle: 12, section: 12, normal: 9, contact: 9 },
        medium: { title: 24, subtitle: 14, section: 14, normal: 10, contact: 10 },
        large: { title: 28, subtitle: 16, section: 16, normal: 11, contact: 11 }
    };
    
    const sizes = fontSizes[config.fontSize];

    // Aplicar template específico
    switch(config.template) {
        case 'classic':
            generateClassicTemplate(doc, data, config, primaryColor, secondaryColor, textColor, sizes, pageWidth, margin, contentWidth);
            break;
        case 'modern':
            console.log('Aplicando template moderno');
            generateModernTemplate(doc, data, config, primaryColor, secondaryColor, textColor, sizes, pageWidth, margin, contentWidth);
            break;
        case 'creative':
            console.log('Aplicando template criativo');
            generateCreativeTemplate(doc, data, config, primaryColor, secondaryColor, textColor, sizes, pageWidth, margin, contentWidth);
            break;
        case 'minimal':
            console.log('Aplicando template minimalista');
            generateMinimalTemplate(doc, data, config, primaryColor, secondaryColor, textColor, sizes, pageWidth, margin, contentWidth);
            break;
        case 'executive':
            console.log('Aplicando template executivo');
            generateExecutiveTemplate(doc, data, config, primaryColor, secondaryColor, textColor, sizes, pageWidth, margin, contentWidth);
            break;
        case 'tech':
            console.log('Aplicando template tech');
            generateTechTemplate(doc, data, config, primaryColor, secondaryColor, textColor, sizes, pageWidth, margin, contentWidth);
            break;
        case 'academic':
            console.log('Aplicando template acadêmico');
            generateAcademicTemplate(doc, data, config, primaryColor, secondaryColor, textColor, sizes, pageWidth, margin, contentWidth);
            break;
        case 'sales':
            console.log('Aplicando template de vendas');
            generateSalesTemplate(doc, data, config, primaryColor, secondaryColor, textColor, sizes, pageWidth, margin, contentWidth);
            break;
        default:
            console.log('Template não encontrado, aplicando clássico');
            generateClassicTemplate(doc, data, config, primaryColor, secondaryColor, textColor, sizes, pageWidth, margin, contentWidth);
    }

    // Salvar o PDF
    const fileName = `${data.fullName.replace(/\s+/g, '_')}_Curriculo.pdf`;
    doc.save(fileName);
}

// Template Clássico (o atual)
function generateClassicTemplate(doc, data, config, primaryColor, secondaryColor, textColor, sizes, pageWidth, margin, contentWidth) {
    let yPosition = 20;

    // Header personalizado
    const headerHeight = 60;
    
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, headerHeight, 'F');

    // Cor do texto do cabeçalho
    doc.setTextColor(255, 255, 255);

    // Nome principal
    doc.setFontSize(sizes.title);
    doc.setFont('helvetica', 'bold');
    const nameWidth = doc.getTextWidth(data.fullName);
    doc.text(data.fullName, (pageWidth - nameWidth) / 2, 25);

    // Título profissional
    if (data.jobTitle) {
        doc.setFontSize(sizes.subtitle);
        doc.setFont('helvetica', 'normal');
        const titleWidth = doc.getTextWidth(data.jobTitle);
        doc.text(data.jobTitle, (pageWidth - titleWidth) / 2, 35);
    }

    // Informações de contato
    doc.setFontSize(sizes.contact);
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
    function addSection(title, content, yPos, icon = '') {
        doc.setFontSize(sizes.section);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        
        let sectionTitle = title;
        if (config.showIcons && icon) {
            sectionTitle = `${icon} ${title}`;
        }
        
        doc.text(sectionTitle, margin, yPos);
        
        // Linha decorativa
        doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        doc.setLineWidth(1);
        doc.line(margin, yPos + 2, margin + 50, yPos + 2);
        
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        return yPos + 10;
    }

    // Função auxiliar para texto multilinha
    function addMultilineText(text, yPos, fontSize = null, fontStyle = 'normal') {
        const actualFontSize = fontSize || sizes.normal;
        doc.setFontSize(actualFontSize);
        doc.setFont('helvetica', fontStyle);
        const lines = doc.splitTextToSize(text, contentWidth);
        doc.text(lines, margin, yPos);
        return yPos + (lines.length * (actualFontSize * 0.4)) + 5;
    }

    // Resumo Profissional
    if (data.summary) {
        yPosition = addSection('RESUMO PROFISSIONAL', '', yPosition);
        yPosition = addMultilineText(data.summary, yPosition, sizes.normal);
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
        doc.setFontSize(sizes.normal - 1);
        doc.setFont('helvetica', 'normal');
        
        let xPos = margin;
        let currentLineY = yPosition;
        
        data.skills.forEach(skill => {
            const skillWidth = doc.getTextWidth(skill) + 8;
            
            // Se não cabe na linha, pula para próxima
            if (xPos + skillWidth > pageWidth - margin) {
                xPos = margin;
                currentLineY += 12;
            }
            
            // Desenhar background da skill
            doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
            doc.roundedRect(xPos, currentLineY - 4, skillWidth, 7, 3, 3, 'F');
            
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
            doc.setFontSize(sizes.normal + 2);
            doc.setFont('helvetica', 'bold');
            doc.text(exp.jobPosition, margin, yPosition);
            yPosition += 6;
            
            // Empresa e período
            doc.setFontSize(sizes.normal);
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
            doc.setFontSize(sizes.normal + 2);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            doc.text(edu.course, margin, yPosition);
            yPosition += 6;
            
            // Instituição e período
            doc.setFontSize(sizes.normal);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            const institutionDate = `${edu.institution} | ${edu.eduStartDate} - ${edu.eduEndDate}`;
            doc.text(institutionDate, margin, yPosition);
            yPosition += 8;
            
            // Descrição (se houver)
            if (edu.description) {
                doc.setTextColor(textColor[0], textColor[1], textColor[2]);
                yPosition = addMultilineText(edu.description, yPosition, sizes.normal);
            }
            
            yPosition += 5;
        });
    }

    // Idiomas
    if (data.languages && data.languages.length > 0) {
        yPosition = addSection('IDIOMAS', '', yPosition);
        
        data.languages.forEach(lang => {
            // Verificar se precisa de nova página
            if (yPosition > 240) {
                doc.addPage();
                yPosition = 20;
            }
            
            // Idioma e nível
            doc.setFontSize(sizes.normal);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            doc.text(`${lang.language} - ${lang.level}`, margin, yPosition);
            yPosition += 8;
        });
        yPosition += 5;
    }

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Página ${i} de ${pageCount}`, pageWidth - margin - 20, doc.internal.pageSize.height - 10);
    }
}

// Template Moderno - Layout em duas colunas
function generateModernTemplate(doc, data, config, primaryColor, secondaryColor, textColor, sizes, pageWidth, margin, contentWidth) {
    let yPosition = 20;

    // Header personalizado mais compacto
    const headerHeight = 50;
    
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, headerHeight, 'F');

    // Nome principal
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(sizes.title - 2);
    doc.setFont('helvetica', 'bold');
    const nameWidth = doc.getTextWidth(data.fullName);
    doc.text(data.fullName, (pageWidth - nameWidth) / 2, 20);

    // Título profissional
    if (data.jobTitle) {
        doc.setFontSize(sizes.subtitle - 1);
        doc.setFont('helvetica', 'normal');
        const titleWidth = doc.getTextWidth(data.jobTitle);
        doc.text(data.jobTitle, (pageWidth - titleWidth) / 2, 30);
    }

    // Informações de contato em linha mais compacta
    doc.setFontSize(sizes.contact - 1);
    let contactInfo = [];
    if (data.phone) contactInfo.push(data.phone);
    if (data.email) contactInfo.push(data.email);
    if (data.address) contactInfo.push(data.address);

    const contactText = contactInfo.join(' | ');
    const contactWidth = doc.getTextWidth(contactText);
    doc.text(contactText, (pageWidth - contactWidth) / 2, 40);

    // Layout em duas colunas
    const leftColWidth = (pageWidth * 0.35) - margin;
    const rightColWidth = (pageWidth * 0.65) - margin;
    const leftColX = margin;
    const rightColX = pageWidth * 0.35;
    
    yPosition = headerHeight + 15;

    // Função auxiliar para adicionar seção da coluna esquerda
    function addLeftSection(title, yPos) {
        doc.setFontSize(sizes.section - 1);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(title, leftColX, yPos);
        
        // Linha decorativa
        doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        doc.setLineWidth(0.5);
        doc.line(leftColX, yPos + 1, leftColX + leftColWidth - 10, yPos + 1);
        
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        return yPos + 8;
    }

    // Função auxiliar para adicionar seção da coluna direita
    function addRightSection(title, yPos) {
        doc.setFontSize(sizes.section - 1);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(title, rightColX, yPos);
        
        // Linha decorativa
        doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        doc.setLineWidth(0.5);
        doc.line(rightColX, yPos + 1, rightColX + rightColWidth - 10, yPos + 1);
        
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        return yPos + 8;
    }

    // Função auxiliar para texto multilinha na coluna esquerda
    function addLeftMultilineText(text, yPos, fontSize = null) {
        const actualFontSize = fontSize || sizes.normal - 1;
        doc.setFontSize(actualFontSize);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(text, leftColWidth - 10);
        doc.text(lines, leftColX, yPos);
        return yPos + (lines.length * (actualFontSize * 0.4)) + 3;
    }

    // Função auxiliar para texto multilinha na coluna direita
    function addRightMultilineText(text, yPos, fontSize = null) {
        const actualFontSize = fontSize || sizes.normal - 1;
        doc.setFontSize(actualFontSize);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(text, rightColWidth - 10);
        doc.text(lines, rightColX, yPos);
        return yPos + (lines.length * (actualFontSize * 0.4)) + 3;
    }

    let leftY = yPosition;
    let rightY = yPosition;

    // COLUNA ESQUERDA - Informações complementares
    
    // Habilidades na coluna esquerda
    if (data.skills && data.skills.length > 0) {
        leftY = addLeftSection('HABILIDADES', leftY);
        
        // Exibir habilidades como lista vertical
        doc.setFontSize(sizes.normal - 2);
        doc.setFont('helvetica', 'normal');
        
        data.skills.forEach(skill => {
            doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
            doc.roundedRect(leftColX, leftY - 3, leftColWidth - 10, 6, 2, 2, 'F');
            doc.setTextColor(255, 255, 255);
            doc.text(skill, leftColX + 3, leftY);
            leftY += 8;
        });
        
        leftY += 5;
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    }

    // Contato detalhado
    leftY = addLeftSection('CONTATO', leftY);
    doc.setFontSize(sizes.normal - 2);
    
    if (data.email) {
        leftY = addLeftMultilineText(`Email: ${data.email}`, leftY, sizes.normal - 2);
    }
    if (data.phone) {
        leftY = addLeftMultilineText(`Telefone: ${data.phone}`, leftY, sizes.normal - 2);
    }
    if (data.website) {
        leftY = addLeftMultilineText(`Website: ${data.website}`, leftY, sizes.normal - 2);
    }
    
    leftY += 10;

    // COLUNA DIREITA - Conteúdo principal

    // Resumo Profissional na coluna direita
    if (data.summary) {
        rightY = addRightSection('RESUMO PROFISSIONAL', rightY);
        rightY = addRightMultilineText(data.summary, rightY, sizes.normal - 1);
        rightY += 10;
    }

    // Experiência Profissional na coluna direita
    if (data.experience && data.experience.length > 0) {
        rightY = addRightSection('EXPERIÊNCIA PROFISSIONAL', rightY);
        
        data.experience.forEach(exp => {
            // Verificar se precisa de nova página
            if (rightY > 250) {
                doc.addPage();
                rightY = 20;
            }
            
            // Cargo
            doc.setFontSize(sizes.normal);
            doc.setFont('helvetica', 'bold');
            doc.text(exp.jobPosition, rightColX, rightY);
            rightY += 5;
            
            // Empresa e período
            doc.setFontSize(sizes.normal - 1);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            const companyDate = `${exp.company} | ${exp.startDate} - ${exp.endDate}`;
            rightY = addRightMultilineText(companyDate, rightY, sizes.normal - 1);
            
            // Descrição
            if (exp.jobDescription) {
                doc.setTextColor(textColor[0], textColor[1], textColor[2]);
                rightY = addRightMultilineText(exp.jobDescription, rightY, sizes.normal - 1);
            }
            
            rightY += 8;
        });
    }

    // Formação Acadêmica na coluna direita
    if (data.education && data.education.length > 0) {
        rightY = addRightSection('FORMAÇÃO ACADÊMICA', rightY);
        
        data.education.forEach(edu => {
            // Verificar se precisa de nova página
            if (rightY > 250) {
                doc.addPage();
                rightY = 20;
            }
            
            // Curso
            doc.setFontSize(sizes.normal);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            doc.text(edu.course, rightColX, rightY);
            rightY += 5;
            
            // Instituição e período
            doc.setFontSize(sizes.normal - 1);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            const institutionDate = `${edu.institution} | ${edu.eduStartDate} - ${edu.eduEndDate}`;
            rightY = addRightMultilineText(institutionDate, rightY, sizes.normal - 1);
            
            // Descrição (se houver)
            if (edu.description) {
                doc.setTextColor(textColor[0], textColor[1], textColor[2]);
                rightY = addRightMultilineText(edu.description, rightY, sizes.normal - 1);
            }
            
            rightY += 8;
        });
    }

    // Idiomas na coluna direita
    if (data.languages && data.languages.length > 0) {
        rightY = addRightSection('IDIOMAS', rightY);
        
        data.languages.forEach(lang => {
            // Verificar se precisa de nova página
            if (rightY > 250) {
                doc.addPage();
                rightY = 20;
            }
            
            // Idioma e nível
            doc.setFontSize(sizes.normal);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            doc.text(`${lang.language} - ${lang.level}`, rightColX, rightY);
            rightY += 8;
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
}

// Template Criativo - Com sidebar
function generateCreativeTemplate(doc, data, config, primaryColor, secondaryColor, textColor, sizes, pageWidth, margin, contentWidth) {
    let yPosition = 20;

    // Header criativo com avatar space
    const headerHeight = 45;
    
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, headerHeight, 'F');

    // Avatar placeholder (círculo)
    doc.setFillColor(255, 255, 255);
    doc.circle(25, 22, 8, 'F');
    doc.setFillColor(primaryColor[0] + 30, primaryColor[1] + 30, primaryColor[2] + 30);
    doc.circle(25, 22, 6, 'F');

    // Nome e título ao lado do avatar
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(sizes.title - 4);
    doc.setFont('helvetica', 'bold');
    doc.text(data.fullName, 40, 18);

    if (data.jobTitle) {
        doc.setFontSize(sizes.subtitle - 2);
        doc.setFont('helvetica', 'italic');
        doc.text(data.jobTitle, 40, 26);
    }

    // Layout com sidebar
    const sidebarWidth = pageWidth * 0.3;
    const mainWidth = (pageWidth * 0.7) - margin;
    const sidebarX = 0;
    const mainX = sidebarWidth;
    
    yPosition = headerHeight + 10;

    // Sidebar com fundo colorido
    doc.setFillColor(primaryColor[0] + 20, primaryColor[1] + 20, primaryColor[2] + 20);
    doc.rect(0, headerHeight, sidebarWidth, doc.internal.pageSize.height - headerHeight, 'F');

    // Funções auxiliares para sidebar
    function addSidebarSection(title, yPos) {
        doc.setFontSize(sizes.section - 2);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(title, 10, yPos);
        
        // Linha decorativa
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.5);
        doc.line(10, yPos + 1, sidebarWidth - 10, yPos + 1);
        
        return yPos + 8;
    }

    function addSidebarText(text, yPos, fontSize = null) {
        const actualFontSize = fontSize || sizes.normal - 1;
        doc.setFontSize(actualFontSize);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(255, 255, 255);
        const lines = doc.splitTextToSize(text, sidebarWidth - 20);
        doc.text(lines, 10, yPos);
        return yPos + (lines.length * (actualFontSize * 0.4)) + 3;
    }

    // Funções auxiliares para área principal
    function addMainSection(title, yPos) {
        doc.setFontSize(sizes.section);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(title, mainX + 10, yPos);
        
        // Linha decorativa
        doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        doc.setLineWidth(1);
        doc.line(mainX + 10, yPos + 2, pageWidth - 10, yPos + 2);
        
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        return yPos + 10;
    }

    function addMainText(text, yPos, fontSize = null) {
        const actualFontSize = fontSize || sizes.normal;
        doc.setFontSize(actualFontSize);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(text, mainWidth - 20);
        doc.text(lines, mainX + 10, yPos);
        return yPos + (lines.length * (actualFontSize * 0.4)) + 5;
    }

    let sidebarY = yPosition;
    let mainY = yPosition;

    // SIDEBAR - Informações pessoais e habilidades

    // Contato
    sidebarY = addSidebarSection('CONTATO', sidebarY);
    if (data.phone) {
        sidebarY = addSidebarText(`${data.phone}`, sidebarY, sizes.normal - 2);
    }
    if (data.email) {
        sidebarY = addSidebarText(`${data.email}`, sidebarY, sizes.normal - 2);
    }
    if (data.address) {
        sidebarY = addSidebarText(`${data.address}`, sidebarY, sizes.normal - 2);
    }
    if (data.website) {
        sidebarY = addSidebarText(`${data.website}`, sidebarY, sizes.normal - 2);
    }
    sidebarY += 10;

    // Habilidades na sidebar
    if (data.skills && data.skills.length > 0) {
        sidebarY = addSidebarSection('HABILIDADES', sidebarY);
        
        data.skills.forEach(skill => {
            doc.setFillColor(255, 255, 255);
            doc.roundedRect(10, sidebarY - 3, sidebarWidth - 20, 6, 2, 2, 'F');
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.setFontSize(sizes.normal - 2);
            doc.setFont('helvetica', 'bold');
            doc.text(skill, 12, sidebarY);
            sidebarY += 8;
        });
        
        sidebarY += 5;
    }

    // ÁREA PRINCIPAL - Resumo, experiência e formação

    // Resumo Profissional
    if (data.summary) {
        mainY = addMainSection('SOBRE MIM', mainY);
        mainY = addMainText(data.summary, mainY, sizes.normal);
        mainY += 10;
    }

    // Experiência Profissional
    if (data.experience && data.experience.length > 0) {
        mainY = addMainSection('EXPERIÊNCIA', mainY);
        
        data.experience.forEach(exp => {
            // Verificar se precisa de nova página
            if (mainY > 250) {
                doc.addPage();
                // Recriar sidebar na nova página
                doc.setFillColor(primaryColor[0] + 20, primaryColor[1] + 20, primaryColor[2] + 20);
                doc.rect(0, 0, sidebarWidth, doc.internal.pageSize.height, 'F');
                mainY = 20;
            }
            
            // Cargo com destaque
            doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
            doc.roundedRect(mainX + 10, mainY - 4, mainWidth - 20, 8, 3, 3, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(sizes.normal + 1);
            doc.setFont('helvetica', 'bold');
            doc.text(exp.jobPosition, mainX + 15, mainY);
            mainY += 10;
            
            // Empresa e período
            doc.setFontSize(sizes.normal - 1);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            const companyDate = `${exp.company} | ${exp.startDate} - ${exp.endDate}`;
            mainY = addMainText(companyDate, mainY, sizes.normal - 1);
            
            // Descrição
            if (exp.jobDescription) {
                doc.setTextColor(textColor[0], textColor[1], textColor[2]);
                mainY = addMainText(exp.jobDescription, mainY);
            }
            
            mainY += 8;
        });
    }

    // Formação Acadêmica
    if (data.education && data.education.length > 0) {
        mainY = addMainSection('FORMAÇÃO', mainY);
        
        data.education.forEach(edu => {
            // Verificar se precisa de nova página
            if (mainY > 250) {
                doc.addPage();
                // Recriar sidebar na nova página
                doc.setFillColor(primaryColor[0] + 20, primaryColor[1] + 20, primaryColor[2] + 20);
                doc.rect(0, 0, sidebarWidth, doc.internal.pageSize.height, 'F');
                mainY = 20;
            }
            
            // Curso
            doc.setFontSize(sizes.normal + 1);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text(edu.course, mainX + 10, mainY);
            mainY += 6;
            
            // Instituição e período
            doc.setFontSize(sizes.normal - 1);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            const institutionDate = `${edu.institution} | ${edu.eduStartDate} - ${edu.eduEndDate}`;
            mainY = addMainText(institutionDate, mainY, sizes.normal - 1);
            
            // Descrição (se houver)
            if (edu.description) {
                doc.setTextColor(textColor[0], textColor[1], textColor[2]);
                mainY = addMainText(edu.description, mainY, sizes.normal - 1);
            }
            
            mainY += 8;
        });
    }

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(255, 255, 255);
        doc.text(`${i}`, sidebarWidth - 15, doc.internal.pageSize.height - 10);
    }
}

// Template Minimalista
function generateMinimalTemplate(doc, data, config, primaryColor, secondaryColor, textColor, sizes, pageWidth, margin, contentWidth) {
    let yPosition = 30;

    // Header minimalista - apenas linha
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    
    // Nome em maiúsculo, centralizado
    doc.setFontSize(sizes.title + 4);
    doc.setFont('helvetica', 'bold');
    const nameWidth = doc.getTextWidth(data.fullName.toUpperCase());
    doc.text(data.fullName.toUpperCase(), (pageWidth - nameWidth) / 2, yPosition);
    yPosition += 8;

    // Título profissional menor, centralizado
    if (data.jobTitle) {
        doc.setFontSize(sizes.subtitle - 1);
        doc.setFont('helvetica', 'normal');
        const titleWidth = doc.getTextWidth(data.jobTitle);
        doc.text(data.jobTitle, (pageWidth - titleWidth) / 2, yPosition);
        yPosition += 8;
    }

    // Linha separadora minimalista
    doc.setDrawColor(textColor[0], textColor[1], textColor[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;

    // Informações de contato em linha única, centralizada
    doc.setFontSize(sizes.contact - 1);
    let contactInfo = [];
    if (data.email) contactInfo.push(data.email);
    if (data.phone) contactInfo.push(data.phone);
    if (data.address) contactInfo.push(data.address);
    if (data.website) contactInfo.push(data.website);

    if (contactInfo.length > 0) {
        const contactText = contactInfo.join(' • ');
        const contactWidth = doc.getTextWidth(contactText);
        doc.text(contactText, (pageWidth - contactWidth) / 2, yPosition);
        yPosition += 15;
    }

    // Função auxiliar para seções minimalistas
    function addMinimalSection(title, yPos) {
        doc.setFontSize(sizes.section - 2);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.text(title.toUpperCase(), margin, yPos);
        
        // Linha sutil abaixo do título
        doc.setDrawColor(150, 150, 150);
        doc.setLineWidth(0.3);
        doc.line(margin, yPos + 2, pageWidth - margin, yPos + 2);
        
        return yPos + 10;
    }

    // Função auxiliar para texto
    function addMinimalText(text, yPos, fontSize = null, fontStyle = 'normal') {
        const actualFontSize = fontSize || sizes.normal - 1;
        doc.setFontSize(actualFontSize);
        doc.setFont('helvetica', fontStyle);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        const lines = doc.splitTextToSize(text, contentWidth);
        doc.text(lines, margin, yPos);
        return yPos + (lines.length * (actualFontSize * 0.4)) + 3;
    }

    // Resumo Profissional
    if (data.summary) {
        yPosition = addMinimalSection('Resumo Profissional', yPosition);
        yPosition = addMinimalText(data.summary, yPosition, sizes.normal - 1);
        yPosition += 10;
    }

    // Habilidades em formato lista simples
    if (data.skills && data.skills.length > 0) {
        yPosition = addMinimalSection('Competências', yPosition);
        
        doc.setFontSize(sizes.normal - 1);
        doc.setFont('helvetica', 'normal');
        
        // Dividir habilidades em linhas
        const skillsPerLine = 3;
        for (let i = 0; i < data.skills.length; i += skillsPerLine) {
            const lineSkills = data.skills.slice(i, i + skillsPerLine);
            const skillText = lineSkills.join(' • ');
            doc.text(skillText, margin, yPosition);
            yPosition += 6;
        }
        
        yPosition += 8;
    }

    // Verificar se precisa de nova página
    if (yPosition > 220) {
        doc.addPage();
        yPosition = 20;
    }

    // Experiência Profissional
    if (data.experience && data.experience.length > 0) {
        yPosition = addMinimalSection('Experiência Profissional', yPosition);
        
        data.experience.forEach(exp => {
            // Verificar se precisa de nova página
            if (yPosition > 240) {
                doc.addPage();
                yPosition = 20;
            }
            
            // Cargo e empresa na mesma linha
            doc.setFontSize(sizes.normal);
            doc.setFont('helvetica', 'bold');
            const jobCompany = `${exp.jobPosition} — ${exp.company}`;
            doc.text(jobCompany, margin, yPosition);
            yPosition += 5;
            
            // Período em itálico
            doc.setFontSize(sizes.normal - 2);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(100, 100, 100);
            doc.text(`${exp.startDate} - ${exp.endDate}`, margin, yPosition);
            yPosition += 6;
            
            // Descrição
            if (exp.jobDescription) {
                doc.setTextColor(textColor[0], textColor[1], textColor[2]);
                yPosition = addMinimalText(exp.jobDescription, yPosition, sizes.normal - 2);
            }
            
            yPosition += 6;
        });
    }

    // Verificar se precisa de nova página
    if (yPosition > 220) {
        doc.addPage();
        yPosition = 20;
    }

    // Formação Acadêmica
    if (data.education && data.education.length > 0) {
        yPosition = addMinimalSection('Formação Acadêmica', yPosition);
        
        data.education.forEach(edu => {
            // Verificar se precisa de nova página
            if (yPosition > 250) {
                doc.addPage();
                yPosition = 20;
            }
            
            // Curso e instituição na mesma linha
            doc.setFontSize(sizes.normal);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            const courseInstitution = `${edu.course} — ${edu.institution}`;
            doc.text(courseInstitution, margin, yPosition);
            yPosition += 5;
            
            // Período
            doc.setFontSize(sizes.normal - 2);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(100, 100, 100);
            doc.text(`${edu.eduStartDate} - ${edu.eduEndDate}`, margin, yPosition);
            yPosition += 6;
            
            // Descrição (se houver)
            if (edu.description) {
                doc.setTextColor(textColor[0], textColor[1], textColor[2]);
                yPosition = addMinimalText(edu.description, yPosition, sizes.normal - 2);
            }
            
            yPosition += 6;
        });
    }

    // Footer minimalista - apenas número da página
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`${i}`, pageWidth / 2, doc.internal.pageSize.height - 10);
    }
}

// Template Executivo
function generateExecutiveTemplate(doc, data, config, primaryColor, secondaryColor, textColor, sizes, pageWidth, margin, contentWidth) {
    let yPosition = 25;

    // Header executivo sofisticado
    const headerHeight = 70;
    
    // Fundo do header com gradiente simulado
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, headerHeight, 'F');
    
    // Borda inferior elegante
    doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setLineWidth(2);
    doc.line(0, headerHeight, pageWidth, headerHeight);

    doc.setTextColor(255, 255, 255);
    
    // Nome em destaque
    doc.setFontSize(sizes.title + 2);
    doc.setFont('helvetica', 'bold');
    const nameWidth = doc.getTextWidth(data.fullName);
    doc.text(data.fullName, (pageWidth - nameWidth) / 2, 30);

    // Título profissional
    if (data.jobTitle) {
        doc.setFontSize(sizes.subtitle);
        doc.setFont('helvetica', 'normal');
        const titleWidth = doc.getTextWidth(data.jobTitle);
        doc.text(data.jobTitle, (pageWidth - titleWidth) / 2, 42);
    }

    // Barra de contato sofisticada
    doc.setFontSize(sizes.contact - 1);
    let contactLine = '';
    const contactParts = [];
    
    if (data.phone) contactParts.push(`${data.phone}`);
    if (data.email) contactParts.push(`${data.email}`);
    if (data.address) contactParts.push(`${data.address}`);
    if (data.website) contactParts.push(`Website`);
    
    contactLine = contactParts.join('  |  ');
    
    if (contactLine) {
        const contactWidth = doc.getTextWidth(contactLine);
        doc.text(contactLine, (pageWidth - contactWidth) / 2, 55);
    }

    yPosition = headerHeight + 20;

    // Função auxiliar para seções executivas
    function addExecutiveSection(title, yPos, icon = '') {
        doc.setFontSize(sizes.section);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        
        // Caixa de destaque para o título
        const titleWidth = doc.getTextWidth(title) + 20;
        doc.setFillColor(240, 240, 240);
        doc.roundedRect(margin, yPos - 6, titleWidth, 10, 2, 2, 'F');
        
        doc.text(title, margin + 10, yPos);
        
        // Linha decorativa executiva
        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setLineWidth(1);
        doc.line(margin + titleWidth + 5, yPos - 1, pageWidth - margin, yPos - 1);
        
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        return yPos + 12;
    }

    // Função auxiliar para texto executivo
    function addExecutiveText(text, yPos, fontSize = null, fontStyle = 'normal') {
        const actualFontSize = fontSize || sizes.normal;
        doc.setFontSize(actualFontSize);
        doc.setFont('helvetica', fontStyle);
        const lines = doc.splitTextToSize(text, contentWidth);
        doc.text(lines, margin, yPos);
        return yPos + (lines.length * (actualFontSize * 0.4)) + 5;
    }

    // Perfil Executivo (Resumo)
    if (data.summary) {
        yPosition = addExecutiveSection('PERFIL EXECUTIVO', yPosition);
        
        // Destaque inicial
        doc.setFillColor(250, 250, 250);
        doc.roundedRect(margin, yPosition - 3, contentWidth, 4, 1, 1, 'F');
        
        yPosition = addExecutiveText(data.summary, yPosition, sizes.normal);
        yPosition += 10;
    }

    // Competências Técnicas (Habilidades)
    if (data.skills && data.skills.length > 0) {
        yPosition = addExecutiveSection('COMPETÊNCIAS TÉCNICAS', yPosition);
        
        // Layout em colunas para habilidades
        const cols = 3;
        const colWidth = contentWidth / cols;
        let currentCol = 0;
        let currentColY = yPosition;
        
        doc.setFontSize(sizes.normal - 1);
        doc.setFont('helvetica', 'normal');
        
        data.skills.forEach((skill, index) => {
            const xPos = margin + (currentCol * colWidth);
            
            // Bullet point sofisticado
            doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.circle(xPos + 3, currentColY - 1, 1, 'F');
            
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            doc.text(skill, xPos + 8, currentColY);
            
            currentCol++;
            if (currentCol >= cols) {
                currentCol = 0;
                currentColY += 6;
            }
        });
        
        yPosition = currentColY + (currentCol > 0 ? 6 : 0) + 10;
    }

    // Verificar se precisa de nova página
    if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
    }

    // Experiência Profissional
    if (data.experience && data.experience.length > 0) {
        yPosition = addExecutiveSection('TRAJETÓRIA PROFISSIONAL', yPosition);
        
        data.experience.forEach(exp => {
            // Verificar se precisa de nova página
            if (yPosition > 220) {
                doc.addPage();
                yPosition = 20;
            }
            
            // Caixa de destaque para cargo
            doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.roundedRect(margin, yPosition - 4, contentWidth, 8, 3, 3, 'F');
            
            // Cargo em branco sobre fundo colorido
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(sizes.normal + 2);
            doc.setFont('helvetica', 'bold');
            doc.text(exp.jobPosition, margin + 10, yPosition);
            yPosition += 10;
            
            // Empresa e período
            doc.setFontSize(sizes.normal);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text(exp.company, margin, yPosition);
            
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(100, 100, 100);
            const periodText = `${exp.startDate} - ${exp.endDate}`;
            const periodWidth = doc.getTextWidth(periodText);
            doc.text(periodText, pageWidth - margin - periodWidth, yPosition);
            yPosition += 8;
            
            // Descrição com espaçamento executivo
            if (exp.jobDescription) {
                doc.setTextColor(textColor[0], textColor[1], textColor[2]);
                yPosition = addExecutiveText(exp.jobDescription, yPosition, sizes.normal - 1);
            }
            
            yPosition += 10;
        });
    }

    // Verificar se precisa de nova página
    if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
    }

    // Formação Acadêmica
    if (data.education && data.education.length > 0) {
        yPosition = addExecutiveSection('FORMAÇÃO ACADÊMICA', yPosition);
        
        data.education.forEach(edu => {
            // Verificar se precisa de nova página
            if (yPosition > 240) {
                doc.addPage();
                yPosition = 20;
            }
            
            // Layout em linha para formação
            doc.setFontSize(sizes.normal + 1);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.text(edu.course, margin, yPosition);
            
            // Período à direita
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            const eduPeriod = `${edu.eduStartDate} - ${edu.eduEndDate}`;
            const eduPeriodWidth = doc.getTextWidth(eduPeriod);
            doc.text(eduPeriod, pageWidth - margin - eduPeriodWidth, yPosition);
            yPosition += 5;
            
            // Instituição
            doc.setFontSize(sizes.normal);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            doc.text(edu.institution, margin, yPosition);
            yPosition += 6;
            
            // Descrição (se houver)
            if (edu.description) {
                yPosition = addExecutiveText(edu.description, yPosition, sizes.normal - 1);
            }
            
            yPosition += 8;
        });
    }

    // Footer executivo
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        
        // Linha decorativa no rodapé
        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setLineWidth(0.5);
        doc.line(margin, doc.internal.pageSize.height - 15, pageWidth - margin, doc.internal.pageSize.height - 15);
        
        doc.setFontSize(8);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFont('helvetica', 'bold');
        doc.text(`${data.fullName}`, margin, doc.internal.pageSize.height - 8);
        doc.text(`Página ${i} de ${pageCount}`, pageWidth - margin - 30, doc.internal.pageSize.height - 8);
    }
}

// Template Tech
function generateTechTemplate(doc, data, config, primaryColor, secondaryColor, textColor, sizes, pageWidth, margin, contentWidth) {
    let yPosition = 20;

    // Header tech com acento colorido
    const headerHeight = 60;
    
    // Fundo escuro
    doc.setFillColor(30, 30, 30);
    doc.rect(0, 0, pageWidth, headerHeight, 'F');
    
    // Acento verde/colorido na lateral
    doc.setFillColor(16, 185, 129); // Verde tech
    doc.rect(0, 0, 5, headerHeight, 'F');

    doc.setTextColor(255, 255, 255);
    
    // Nome estilo code
    doc.setFontSize(sizes.title);
    doc.setFont('courier', 'bold');
    doc.text(data.fullName, 15, 25);

    // Título profissional com chaves
    if (data.jobTitle) {
        doc.setFontSize(sizes.subtitle);
        doc.setFont('courier', 'normal');
        doc.setTextColor(16, 185, 129);
        doc.text(`{ ${data.jobTitle} }`, 15, 40);
    }

    // Informações de contato estilo terminal
    doc.setFontSize(sizes.contact);
    doc.setTextColor(200, 200, 200);
    doc.setFont('courier', 'normal');
    
    let contactY = 50;
    if (data.email) {
        doc.text(`> email: ${data.email}`, 15, contactY);
        contactY += 6;
    }
    if (data.phone) {
        doc.text(`> phone: ${data.phone}`, 15, contactY);
    }

    yPosition = headerHeight + 15;

    // Função auxiliar para seções tech
    function addTechSection(title, yPos) {
        doc.setFontSize(sizes.section);
        doc.setFont('courier', 'bold');
        doc.setTextColor(16, 185, 129);
        doc.text(`// ${title.toUpperCase()}`, margin, yPos);
        
        // Linha de código decorativa
        doc.setDrawColor(100, 100, 100);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos + 2, pageWidth - margin, yPos + 2);
        
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        return yPos + 10;
    }

    // Função auxiliar para texto tech
    function addTechText(text, yPos, fontSize = null) {
        const actualFontSize = fontSize || sizes.normal;
        doc.setFontSize(actualFontSize);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(text, contentWidth);
        doc.text(lines, margin, yPos);
        return yPos + (lines.length * (actualFontSize * 0.4)) + 5;
    }

    // About/Resumo
    if (data.summary) {
        yPosition = addTechSection('about()', yPosition);
        yPosition = addTechText(data.summary, yPosition);
        yPosition += 10;
    }

    // Tech Stack (Habilidades)
    if (data.skills && data.skills.length > 0) {
        yPosition = addTechSection('techStack[]', yPosition);
        
        // Grid de tecnologias
        const cols = 3;
        const colWidth = contentWidth / cols;
        let currentCol = 0;
        let currentColY = yPosition;
        
        data.skills.forEach(skill => {
            const xPos = margin + (currentCol * colWidth);
            
            // Caixa de tecnologia
            doc.setFillColor(240, 240, 240);
            doc.roundedRect(xPos, currentColY - 4, colWidth - 10, 8, 2, 2, 'F');
            
            // Border colorido
            doc.setDrawColor(16, 185, 129);
            doc.setLineWidth(0.5);
            doc.roundedRect(xPos, currentColY - 4, colWidth - 10, 8, 2, 2, 'S');
            
            // Texto da tecnologia
            doc.setFontSize(sizes.normal - 2);
            doc.setFont('courier', 'bold');
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            doc.text(skill, xPos + 5, currentColY);
            
            currentCol++;
            if (currentCol >= cols) {
                currentCol = 0;
                currentColY += 12;
            }
        });
        
        yPosition = currentColY + (currentCol > 0 ? 12 : 0) + 10;
    }

    // Verificar se precisa de nova página
    if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
    }

    // Experience/Projetos
    if (data.experience && data.experience.length > 0) {
        yPosition = addTechSection('experience.map()', yPosition);
        
        data.experience.forEach(exp => {
            // Verificar se precisa de nova página
            if (yPosition > 220) {
                doc.addPage();
                yPosition = 20;
            }
            
            // Função/método para experiência
            doc.setFontSize(sizes.normal + 1);
            doc.setFont('courier', 'bold');
            doc.setTextColor(16, 185, 129);
            doc.text(`function ${exp.jobPosition.replace(/\s+/g, '')}() {`, margin, yPosition);
            yPosition += 8;
            
            // Empresa e período como comentário
            doc.setFontSize(sizes.normal - 1);
            doc.setFont('courier', 'italic');
            doc.setTextColor(150, 150, 150);
            doc.text(`  // ${exp.company} | ${exp.startDate} - ${exp.endDate}`, margin, yPosition);
            yPosition += 8;
            
            // Descrição como código
            if (exp.jobDescription) {
                doc.setTextColor(textColor[0], textColor[1], textColor[2]);
                doc.setFont('helvetica', 'normal');
                const lines = doc.splitTextToSize(exp.jobDescription, contentWidth - 20);
                lines.forEach(line => {
                    doc.text(`  ${line}`, margin, yPosition);
                    yPosition += 5;
                });
            }
            
            // Fechamento da função
            doc.setFontSize(sizes.normal + 1);
            doc.setFont('courier', 'bold');
            doc.setTextColor(16, 185, 129);
            doc.text(`}`, margin, yPosition);
            yPosition += 12;
        });
    }

    // Verificar se precisa de nova página
    if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
    }

    // Education/Formação
    if (data.education && data.education.length > 0) {
        yPosition = addTechSection('education.history', yPosition);
        
        data.education.forEach(edu => {
            // Verificar se precisa de nova página
            if (yPosition > 240) {
                doc.addPage();
                yPosition = 20;
            }
            
            // Classe para educação
            doc.setFontSize(sizes.normal);
            doc.setFont('courier', 'bold');
            doc.setTextColor(16, 185, 129);
            doc.text(`class ${edu.course.replace(/\s+/g, '')} {`, margin, yPosition);
            yPosition += 6;
            
            // Propriedades da classe
            doc.setFontSize(sizes.normal - 1);
            doc.setFont('courier', 'normal');
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            
            doc.text(`  institution: "${edu.institution}"`, margin, yPosition);
            yPosition += 5;
            doc.text(`  period: "${edu.eduStartDate} - ${edu.eduEndDate}"`, margin, yPosition);
            yPosition += 5;
            
            // Descrição como método
            if (edu.description) {
                doc.text(`  description() {`, margin, yPosition);
                yPosition += 5;
                
                const lines = doc.splitTextToSize(edu.description, contentWidth - 30);
                lines.forEach(line => {
                    doc.text(`    return "${line}"`, margin, yPosition);
                    yPosition += 4;
                });
                
                doc.text(`  }`, margin, yPosition);
                yPosition += 5;
            }
            
            // Fechamento da classe
            doc.setFont('courier', 'bold');
            doc.setTextColor(16, 185, 129);
            doc.text(`}`, margin, yPosition);
            yPosition += 10;
        });
    }

    // Footer tech
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        
        // Linha de código no rodapé
        doc.setFillColor(50, 50, 50);
        doc.rect(0, doc.internal.pageSize.height - 15, pageWidth, 15, 'F');
        
        doc.setFontSize(8);
        doc.setFont('courier', 'normal');
        doc.setTextColor(16, 185, 129);
        doc.text(`console.log("Page ${i}/${pageCount}")`, margin, doc.internal.pageSize.height - 5);
        
        doc.setTextColor(200, 200, 200);
        doc.text(`// ${data.fullName.toLowerCase().replace(/\s+/g, '_')}_resume.pdf`, pageWidth - margin - 80, doc.internal.pageSize.height - 5);
    }
}

// Template Acadêmico
function generateAcademicTemplate(doc, data, config, primaryColor, secondaryColor, textColor, sizes, pageWidth, margin, contentWidth) {
    let yPosition = 20;

    // Header acadêmico formal
    const headerHeight = 70;
    
    // Fundo azul acadêmico
    doc.setFillColor(3, 105, 161);
    doc.rect(0, 0, pageWidth, headerHeight, 'F');

    doc.setTextColor(255, 255, 255);
    
    // Nome formal
    doc.setFontSize(sizes.title + 4);
    doc.setFont('times', 'bold');
    const nameWidth = doc.getTextWidth(data.fullName);
    doc.text(data.fullName, (pageWidth - nameWidth) / 2, 25);

    // Título acadêmico
    if (data.jobTitle) {
        doc.setFontSize(sizes.subtitle + 2);
        doc.setFont('times', 'italic');
        const titleWidth = doc.getTextWidth(data.jobTitle);
        doc.text(data.jobTitle, (pageWidth - titleWidth) / 2, 40);
    }

    // Linha divisória elegante
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(1);
    doc.line(margin, 50, pageWidth - margin, 50);

    // Informações de contato
    doc.setFontSize(sizes.contact);
    doc.setFont('times', 'normal');
    let contactText = '';
    if (data.email) contactText += data.email;
    if (data.phone) contactText += (contactText ? ' | ' : '') + data.phone;
    if (data.address) contactText += (contactText ? ' | ' : '') + data.address;
    
    if (contactText) {
        const contactWidth = doc.getTextWidth(contactText);
        doc.text(contactText, (pageWidth - contactWidth) / 2, 60);
    }

    yPosition = headerHeight + 20;

    // Função auxiliar para seções acadêmicas
    function addAcademicSection(title, yPos) {
        doc.setFontSize(sizes.section + 2);
        doc.setFont('times', 'bold');
        doc.setTextColor(3, 105, 161);
        doc.text(title.toUpperCase(), margin, yPos);
        
        // Linha dupla sob o título
        doc.setDrawColor(3, 105, 161);
        doc.setLineWidth(1.5);
        doc.line(margin, yPos + 2, pageWidth - margin, yPos + 2);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos + 4, pageWidth - margin, yPos + 4);
        
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        return yPos + 15;
    }

    // Função auxiliar para texto acadêmico
    function addAcademicText(text, yPos, fontSize = null, isItalic = false) {
        const actualFontSize = fontSize || sizes.normal;
        doc.setFontSize(actualFontSize);
        doc.setFont('times', isItalic ? 'italic' : 'normal');
        const lines = doc.splitTextToSize(text, contentWidth);
        doc.text(lines, margin, yPos);
        return yPos + (lines.length * (actualFontSize * 0.4)) + 5;
    }

    // Resumo/Perfil Acadêmico
    if (data.summary) {
        yPosition = addAcademicSection('Perfil Acadêmico', yPosition);
        yPosition = addAcademicText(data.summary, yPosition, null, true);
        yPosition += 10;
    }

    // Formação Acadêmica (Prioridade máxima)
    if (data.education && data.education.length > 0) {
        yPosition = addAcademicSection('Formação Acadêmica', yPosition);
        
        // Ordenar por nível (PhD, Mestrado, Graduação)
        const sortedEducation = [...data.education].sort((a, b) => {
            const levels = { 'phd': 1, 'doutorado': 1, 'mestrado': 2, 'graduação': 3, 'graduacao': 3 };
            const levelA = levels[a.course.toLowerCase()] || 4;
            const levelB = levels[b.course.toLowerCase()] || 4;
            return levelA - levelB;
        });

        sortedEducation.forEach(edu => {
            // Verificar se precisa de nova página
            if (yPosition > 230) {
                doc.addPage();
                yPosition = 20;
            }
            
            // Grau e curso
            doc.setFontSize(sizes.normal + 1);
            doc.setFont('times', 'bold');
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            doc.text(`${edu.course}`, margin, yPosition);
            yPosition += 7;
            
            // Instituição e período
            doc.setFontSize(sizes.normal);
            doc.setFont('times', 'normal');
            doc.setTextColor(3, 105, 161);
            doc.text(`${edu.institution} | ${edu.eduStartDate} - ${edu.eduEndDate}`, margin, yPosition);
            yPosition += 6;
            
            // Descrição/Tese
            if (edu.description) {
                doc.setTextColor(textColor[0], textColor[1], textColor[2]);
                doc.setFont('times', 'italic');
                yPosition = addAcademicText(`Descrição: ${edu.description}`, yPosition, sizes.normal - 1, true);
            }
            
            yPosition += 8;
        });
    }

    // Verificar se precisa de nova página
    if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
    }

    // Experiência Profissional/Acadêmica
    if (data.experience && data.experience.length > 0) {
        yPosition = addAcademicSection('Experiência Profissional', yPosition);
        
        data.experience.forEach(exp => {
            // Verificar se precisa de nova página
            if (yPosition > 220) {
                doc.addPage();
                yPosition = 20;
            }
            
            // Cargo
            doc.setFontSize(sizes.normal + 1);
            doc.setFont('times', 'bold');
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            doc.text(exp.jobPosition, margin, yPosition);
            yPosition += 7;
            
            // Instituição e período
            doc.setFontSize(sizes.normal);
            doc.setFont('times', 'normal');
            doc.setTextColor(3, 105, 161);
            doc.text(`${exp.company} | ${exp.startDate} - ${exp.endDate}`, margin, yPosition);
            yPosition += 6;
            
            // Descrição
            if (exp.jobDescription) {
                doc.setTextColor(textColor[0], textColor[1], textColor[2]);
                doc.setFont('times', 'normal');
                yPosition = addAcademicText(exp.jobDescription, yPosition);
            }
            
            yPosition += 8;
        });
    }

    // Verificar se precisa de nova página
    if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
    }

    // Habilidades/Competências
    if (data.skills && data.skills.length > 0) {
        yPosition = addAcademicSection('Competências e Habilidades', yPosition);
        
        // Organizar habilidades em lista formal
        const skillsText = data.skills.join(' • ');
        yPosition = addAcademicText(skillsText, yPosition);
        yPosition += 10;
    }

    // Rodapé acadêmico
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        
        // Linha elegante no rodapé
        doc.setDrawColor(3, 105, 161);
        doc.setLineWidth(0.5);
        doc.line(margin, doc.internal.pageSize.height - 20, pageWidth - margin, doc.internal.pageSize.height - 20);
        
        // Numeração
        doc.setFontSize(9);
        doc.setFont('times', 'normal');
        doc.setTextColor(100, 100, 100);
        const pageText = `${i}`;
        const pageTextWidth = doc.getTextWidth(pageText);
        doc.text(pageText, (pageWidth - pageTextWidth) / 2, doc.internal.pageSize.height - 10);
    }
}

// Template Vendas/Comercial
function generateSalesTemplate(doc, data, config, primaryColor, secondaryColor, textColor, sizes, pageWidth, margin, contentWidth) {
    let yPosition = 20;

    // Header comercial dinâmico
    const headerHeight = 80;
    
    // Gradiente laranja/vermelho
    doc.setFillColor(234, 88, 12);
    doc.rect(0, 0, pageWidth, headerHeight, 'F');

    // Sidebar para foto e contato
    const sidebarWidth = 70;
    doc.setFillColor(251, 146, 60);
    doc.rect(0, 0, sidebarWidth, headerHeight, 'F');

    // Área da foto
    doc.setFillColor(255, 255, 255);
    doc.setFillColor(255, 237, 213);
    doc.ellipse(35, 35, 20, 20, 'F');
    
    // Círculo de pessoa sem ícone
    doc.setTextColor(234, 88, 12);
    doc.setFontSize(16);

    // Informações de contato na sidebar
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    
    let contactY = 55;
    if (data.phone) {
        doc.text(data.phone, 8, contactY);
        contactY += 8;
    }
    if (data.email) {
        doc.text(data.email.length > 25 ? data.email.substring(0, 23) + '...' : data.email, 8, contactY);
    }

    // Área principal
    doc.setTextColor(255, 255, 255);
    
    // Nome em destaque
    doc.setFontSize(sizes.title + 2);
    doc.setFont('helvetica', 'bold');
    doc.text(data.fullName.toUpperCase(), sidebarWidth + 15, 30);

    // Título profissional
    if (data.jobTitle) {
        doc.setFontSize(sizes.subtitle + 1);
        doc.setFont('helvetica', 'normal');
        doc.text(data.jobTitle, sidebarWidth + 15, 45);
    }

    // Destaque comercial (meta, conquista, etc.)
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(sidebarWidth + 15, 55, 100, 15, 3, 3, 'F');
    doc.setTextColor(234, 88, 12);
    doc.setFontSize(sizes.normal);
    doc.setFont('helvetica', 'bold');
    doc.text('META 2024: SUPERADA EM 125%', sidebarWidth + 20, 65);

    yPosition = headerHeight + 15;

    // Função auxiliar para seções de vendas
    function addSalesSection(title, yPos) {
        // Fundo colorido para a seção
        doc.setFillColor(251, 146, 60);
        doc.roundedRect(margin - 5, yPos - 8, contentWidth + 10, 15, 3, 3, 'F');
        
        doc.setFontSize(sizes.section);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(`${title.toUpperCase()}`, margin, yPos);
        
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        return yPos + 15;
    }

    // Função auxiliar para texto de vendas
    function addSalesText(text, yPos, fontSize = null, highlight = false) {
        const actualFontSize = fontSize || sizes.normal;
        doc.setFontSize(actualFontSize);
        doc.setFont('helvetica', highlight ? 'bold' : 'normal');
        if (highlight) doc.setTextColor(234, 88, 12);
        const lines = doc.splitTextToSize(text, contentWidth);
        doc.text(lines, margin, yPos);
        if (highlight) doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        return yPos + (lines.length * (actualFontSize * 0.4)) + 5;
    }

    // Resumo/Pitch de vendas
    if (data.summary) {
        yPosition = addSalesSection('Perfil Comercial', yPosition);
        yPosition = addSalesText(data.summary, yPosition, null, true);
        yPosition += 10;
    }

    // Experiência com foco em resultados
    if (data.experience && data.experience.length > 0) {
        yPosition = addSalesSection('Experiência em Vendas', yPosition);
        
        data.experience.forEach(exp => {
            // Verificar se precisa de nova página
            if (yPosition > 220) {
                doc.addPage();
                yPosition = 20;
            }
            
            // Cargo com destaque
            doc.setFontSize(sizes.normal + 1);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(234, 88, 12);
            doc.text(`${exp.jobPosition}`, margin, yPosition);
            yPosition += 7;
            
            // Empresa e período
            doc.setFontSize(sizes.normal);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            doc.text(`${exp.company} | ${exp.startDate} - ${exp.endDate}`, margin + 15, yPosition);
            yPosition += 6;
            
            // Conquistas/Resultados
            if (exp.jobDescription) {
                // Destacar números e percentuais
                let description = exp.jobDescription;
                doc.setFont('helvetica', 'normal');
                yPosition = addSalesText(`• ${description}`, yPosition, sizes.normal - 1);
            }
            
            yPosition += 8;
        });
    }

    // Verificar se precisa de nova página
    if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
    }

    // Habilidades comerciais
    if (data.skills && data.skills.length > 0) {
        yPosition = addSalesSection('Habilidades Comerciais', yPosition);
        
        // Grid de habilidades com ícones
        const cols = 2;
        const colWidth = contentWidth / cols;
        let currentCol = 0;
        let currentColY = yPosition;
        
        data.skills.forEach(skill => {
            const xPos = margin + (currentCol * colWidth);
            
            // Ícone + habilidade
            doc.setFontSize(sizes.normal);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            doc.text(`✓ ${skill}`, xPos, currentColY);
            
            currentCol++;
            if (currentCol >= cols) {
                currentCol = 0;
                currentColY += 8;
            }
        });
        
        yPosition = currentColY + (currentCol > 0 ? 8 : 0) + 10;
    }

    // Formação (simplificada)
    if (data.education && data.education.length > 0) {
        yPosition = addSalesSection('Formação', yPosition);
        
        data.education.forEach(edu => {
            // Verificar se precisa de nova página
            if (yPosition > 240) {
                doc.addPage();
                yPosition = 20;
            }
            
            doc.setFontSize(sizes.normal);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            doc.text(`${edu.course} - ${edu.institution} (${edu.eduEndDate})`, margin, yPosition);
            yPosition += 8;
        });
    }

    // Rodapé comercial
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        
        // Fundo colorido no rodapé
        doc.setFillColor(251, 146, 60);
        doc.rect(0, doc.internal.pageSize.height - 20, pageWidth, 20, 'F');
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(`${data.fullName} - Profissional de Vendas`, margin, doc.internal.pageSize.height - 8);
        
        doc.text(`Página ${i}/${pageCount}`, pageWidth - margin - 30, doc.internal.pageSize.height - 8);
    }
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