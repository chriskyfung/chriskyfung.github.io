# -*- encoding: utf-8 -*-
# stub: jekyll-scholar 7.1.0 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-scholar".freeze
  s.version = "7.1.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.3.6".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Sylvester Keil".freeze]
  s.date = "2022-05-19"
  s.description = " Jekyll-Scholar is for all the academic bloggers out there. It is a set of extensions for Jekyll the awesome, blog aware, static site generator; it formats your BibTeX bibliographies for the web using CSL citation styles and generally gives your blog posts citation super-powers.' ".freeze
  s.email = "http://sylvester.keil.or.at".freeze
  s.homepage = "http://github.com/inukshuk/jekyll-scholar".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.3.7".freeze
  s.summary = "Jekyll extensions for the academic blogger.".freeze

  s.installed_by_version = "3.3.7" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<jekyll>.freeze, ["~> 4.0"])
    s.add_runtime_dependency(%q<citeproc-ruby>.freeze, ["~> 1.0"])
    s.add_runtime_dependency(%q<csl-styles>.freeze, ["~> 1.0"])
    s.add_runtime_dependency(%q<bibtex-ruby>.freeze, ["~> 6.0"])
  else
    s.add_dependency(%q<jekyll>.freeze, ["~> 4.0"])
    s.add_dependency(%q<citeproc-ruby>.freeze, ["~> 1.0"])
    s.add_dependency(%q<csl-styles>.freeze, ["~> 1.0"])
    s.add_dependency(%q<bibtex-ruby>.freeze, ["~> 6.0"])
  end
end
