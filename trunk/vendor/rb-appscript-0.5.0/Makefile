
SHELL = /bin/sh

#### Start of system configuration section. ####

srcdir = src
topdir = /usr/local/lib/ruby/1.8/i686-darwin8.10.3
hdrdir = $(topdir)
VPATH = $(srcdir):$(topdir):$(hdrdir)
prefix = $(DESTDIR)/usr/local
exec_prefix = $(prefix)
sitedir = $(prefix)/lib/ruby/site_ruby
rubylibdir = $(libdir)/ruby/$(ruby_version)
archdir = $(rubylibdir)/$(arch)
sbindir = $(exec_prefix)/sbin
datadir = $(prefix)/share
includedir = $(prefix)/include
infodir = $(prefix)/info
sysconfdir = $(prefix)/etc
mandir = $(prefix)/man
libdir = $(exec_prefix)/lib
sharedstatedir = $(prefix)/com
oldincludedir = $(DESTDIR)/usr/include
sitearchdir = $(sitelibdir)/$(sitearch)
bindir = $(exec_prefix)/bin
localstatedir = $(prefix)/var
sitelibdir = $(sitedir)/$(ruby_version)
libexecdir = $(exec_prefix)/libexec

CC = gcc
LIBRUBY = $(LIBRUBY_A)
LIBRUBY_A = lib$(RUBY_SO_NAME)-static.a
LIBRUBYARG_SHARED = 
LIBRUBYARG_STATIC = -l$(RUBY_SO_NAME)-static

CFLAGS   =  -fno-common -g -O2 -pipe -fno-common -Wall 
CPPFLAGS = -I. -I$(topdir) -I$(hdrdir) -I$(srcdir)  
CXXFLAGS = $(CFLAGS) 
DLDFLAGS =  -framework Carbon -framework ApplicationServices  
LDSHARED = cc -dynamic -bundle -undefined suppress -flat_namespace
AR = ar
EXEEXT = 

RUBY_INSTALL_NAME = ruby
RUBY_SO_NAME = ruby
arch = i686-darwin8.10.3
sitearch = i686-darwin8.10.3
ruby_version = 1.8
ruby = /usr/local/bin/ruby
RUBY = $(ruby)
RM = rm -f
MAKEDIRS = mkdir -p
INSTALL = /usr/bin/install -c
INSTALL_PROG = $(INSTALL) -m 0755
INSTALL_DATA = $(INSTALL) -m 644
COPY = cp

#### End of system configuration section. ####

preload = 

libpath = $(libdir)
LIBPATH =  -L"$(libdir)"
DEFFILE = 

CLEANFILES = 
DISTCLEANFILES = 

extout = 
extout_prefix = 
target_prefix = 
LOCAL_LIBS = 
LIBS =   -lpthread -ldl -lobjc  
SRCS = rbae.c SendThreadSafe.c
OBJS = rbae.o SendThreadSafe.o
TARGET = ae
DLLIB = $(TARGET).bundle
STATIC_LIB = 

RUBYCOMMONDIR = $(sitedir)$(target_prefix)
RUBYLIBDIR = /usr/local/lib/ruby/gems/1.8/gems/rb-appscript-0.5.0/lib$(target_prefix)
RUBYARCHDIR = /usr/local/lib/ruby/gems/1.8/gems/rb-appscript-0.5.0/lib$(target_prefix)

TARGET_SO     = $(DLLIB)
CLEANLIBS     = $(TARGET).bundle $(TARGET).il? $(TARGET).tds $(TARGET).map
CLEANOBJS     = *.o *.a *.s[ol] *.pdb *.exp *.bak

all:		$(DLLIB)
static:		$(STATIC_LIB)

clean:
		@-$(RM) $(CLEANLIBS) $(CLEANOBJS) $(CLEANFILES)

distclean:	clean
		@-$(RM) Makefile extconf.h conftest.* mkmf.log
		@-$(RM) core ruby$(EXEEXT) *~ $(DISTCLEANFILES)

realclean:	distclean
install: install-so install-rb

install-so: $(RUBYARCHDIR)
install-so: $(RUBYARCHDIR)/$(DLLIB)
$(RUBYARCHDIR)/$(DLLIB): $(DLLIB)
	$(INSTALL_PROG) $(DLLIB) $(RUBYARCHDIR)
install-rb: pre-install-rb install-rb-default
install-rb-default: pre-install-rb-default
pre-install-rb: Makefile
pre-install-rb-default: Makefile
pre-install-rb-default: $(RUBYLIBDIR)
install-rb-default: $(RUBYLIBDIR)/aem.rb
$(RUBYLIBDIR)/aem.rb: src/lib/aem.rb
	$(INSTALL_DATA) src/lib/aem.rb $(@D)
install-rb-default: $(RUBYLIBDIR)/appscript.rb
$(RUBYLIBDIR)/appscript.rb: src/lib/appscript.rb
	$(INSTALL_DATA) src/lib/appscript.rb $(@D)
install-rb-default: $(RUBYLIBDIR)/kae.rb
$(RUBYLIBDIR)/kae.rb: src/lib/kae.rb
	$(INSTALL_DATA) src/lib/kae.rb $(@D)
install-rb-default: $(RUBYLIBDIR)/osax.rb
$(RUBYLIBDIR)/osax.rb: src/lib/osax.rb
	$(INSTALL_DATA) src/lib/osax.rb $(@D)
pre-install-rb-default: $(RUBYLIBDIR)/_aem
install-rb-default: $(RUBYLIBDIR)/_aem/aemreference.rb
$(RUBYLIBDIR)/_aem/aemreference.rb: src/lib/_aem/aemreference.rb
	$(INSTALL_DATA) src/lib/_aem/aemreference.rb $(@D)
install-rb-default: $(RUBYLIBDIR)/_aem/codecs.rb
$(RUBYLIBDIR)/_aem/codecs.rb: src/lib/_aem/codecs.rb
	$(INSTALL_DATA) src/lib/_aem/codecs.rb $(@D)
install-rb-default: $(RUBYLIBDIR)/_aem/connect.rb
$(RUBYLIBDIR)/_aem/connect.rb: src/lib/_aem/connect.rb
	$(INSTALL_DATA) src/lib/_aem/connect.rb $(@D)
install-rb-default: $(RUBYLIBDIR)/_aem/findapp.rb
$(RUBYLIBDIR)/_aem/findapp.rb: src/lib/_aem/findapp.rb
	$(INSTALL_DATA) src/lib/_aem/findapp.rb $(@D)
install-rb-default: $(RUBYLIBDIR)/_aem/mactypes.rb
$(RUBYLIBDIR)/_aem/mactypes.rb: src/lib/_aem/mactypes.rb
	$(INSTALL_DATA) src/lib/_aem/mactypes.rb $(@D)
install-rb-default: $(RUBYLIBDIR)/_aem/send.rb
$(RUBYLIBDIR)/_aem/send.rb: src/lib/_aem/send.rb
	$(INSTALL_DATA) src/lib/_aem/send.rb $(@D)
install-rb-default: $(RUBYLIBDIR)/_aem/typewrappers.rb
$(RUBYLIBDIR)/_aem/typewrappers.rb: src/lib/_aem/typewrappers.rb
	$(INSTALL_DATA) src/lib/_aem/typewrappers.rb $(@D)
pre-install-rb-default: $(RUBYLIBDIR)/_appscript
install-rb-default: $(RUBYLIBDIR)/_appscript/defaultterminology.rb
$(RUBYLIBDIR)/_appscript/defaultterminology.rb: src/lib/_appscript/defaultterminology.rb
	$(INSTALL_DATA) src/lib/_appscript/defaultterminology.rb $(@D)
install-rb-default: $(RUBYLIBDIR)/_appscript/referencerenderer.rb
$(RUBYLIBDIR)/_appscript/referencerenderer.rb: src/lib/_appscript/referencerenderer.rb
	$(INSTALL_DATA) src/lib/_appscript/referencerenderer.rb $(@D)
install-rb-default: $(RUBYLIBDIR)/_appscript/reservedkeywords.rb
$(RUBYLIBDIR)/_appscript/reservedkeywords.rb: src/lib/_appscript/reservedkeywords.rb
	$(INSTALL_DATA) src/lib/_appscript/reservedkeywords.rb $(@D)
install-rb-default: $(RUBYLIBDIR)/_appscript/safeobject.rb
$(RUBYLIBDIR)/_appscript/safeobject.rb: src/lib/_appscript/safeobject.rb
	$(INSTALL_DATA) src/lib/_appscript/safeobject.rb $(@D)
install-rb-default: $(RUBYLIBDIR)/_appscript/terminology.rb
$(RUBYLIBDIR)/_appscript/terminology.rb: src/lib/_appscript/terminology.rb
	$(INSTALL_DATA) src/lib/_appscript/terminology.rb $(@D)
$(RUBYARCHDIR):
	$(MAKEDIRS) $@
$(RUBYLIBDIR):
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/_aem:
	$(MAKEDIRS) $@
$(RUBYLIBDIR)/_appscript:
	$(MAKEDIRS) $@

site-install: site-install-so site-install-rb
site-install-so: install-so
site-install-rb: install-rb

.SUFFIXES: .c .m .cc .cxx .cpp .C .o

.cc.o:
	$(CXX) $(CXXFLAGS) $(CPPFLAGS) -c $<

.cxx.o:
	$(CXX) $(CXXFLAGS) $(CPPFLAGS) -c $<

.cpp.o:
	$(CXX) $(CXXFLAGS) $(CPPFLAGS) -c $<

.C.o:
	$(CXX) $(CXXFLAGS) $(CPPFLAGS) -c $<

.c.o:
	$(CC) $(CFLAGS) $(CPPFLAGS) -c $<

$(DLLIB): $(OBJS)
	@-$(RM) $@
	$(LDSHARED) $(DLDFLAGS) $(LIBPATH) -o $@ $(OBJS) $(LOCAL_LIBS) $(LIBS)



$(OBJS): ruby.h defines.h
